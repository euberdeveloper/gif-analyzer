import { BytesView } from '@blackmirror/bytes-mirror';

import { ExtensionLabel, EXTENSION_INTRODUCER, TRAILER } from '@/types';

import {
    GifData,
    GifHeader,
    GifRfc,
    GifLogicalScreenDescriptor,
    GifRfcValue,
    rfcToValue,
    GifRfcRaw,
    rfcToRaw,
    GifColor,
    GifPlainTextExtension,
    GifApplicationExtension,
    GifGraphicBlock,
    GifGraphicControlExtension,
    GifExtension,
    GifGraphicRenderingBlock,
    GifTableBasedImage,
    GifImageDescriptor,
    GifTableBasedImageData,
    GifCommentExtension
} from './rfc';

export abstract class GifAnalyzer<B> {
    private readonly bytes: BytesView<B>;
    private readonly _rfc: GifRfc<B>;
    private cursor = 0;

    get rfc(): GifRfc<B> {
        return this._rfc;
    }

    get raw(): GifRfcRaw<B> {
        return rfcToRaw(this._rfc);
    }

    get value(): GifRfcValue {
        return rfcToValue(this._rfc);
    }

    constructor(bytes: B) {
        this.bytes = this.bytesToBytesView(bytes);
        this._rfc = {
            header: this.parseHeader(),
            logicalScreen: this.parseLogicalScreen(),
            data: this.parseData()
        };
    }

    private parseHeader(): GifHeader<B> {
        const result = this.instantiateHeader(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseLogicalScreen(): {
        descriptor: GifLogicalScreenDescriptor<B>;
        globalColorTable: GifColor<B>[] | null;
    } {
        const descriptor = this.parseLogicalScreenDescriptor();
        const globalColorTable = this.parseColorTable(
            descriptor.packedFields.value.globalColorTableFlag,
            descriptor.packedFields.value.globalColorTableSize
        );
        return { descriptor, globalColorTable };
    }

    private parseLogicalScreenDescriptor(): GifLogicalScreenDescriptor<B> {
        const result = this.instantiateLogicalScreenDescriptor(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseColorTable(exists: boolean, size: number): GifColor<B>[] | null {
        if (exists) {
            const handledSize = 2 ** (size + 1);
            const colorTable: GifColor<B>[] = [];

            for (let i = 0; i < handledSize; i++) {
                const color = this.instantiateColor(this.bytes, this.cursor);
                colorTable.push(color);
                this.cursor += color.size;
            }

            return colorTable;
        } else {
            return null;
        }
    }

    private parseData(): GifData<B>[] {
        const data: GifData<B>[] = [];

        for (
            let nextByte = this.bytes.readUint8(this.cursor);
            nextByte !== TRAILER;
            nextByte = this.bytes.readUint8(this.cursor)
        ) {
            switch (nextByte) {
                case EXTENSION_INTRODUCER:
                    data.push(this.parseExtension());
                    break;
                case ExtensionLabel.IMAGE_SEPARATOR:
                    this.cursor++;
                    data.push(this.parseGraphicBlock(false));
                    break;
                default:
                    throw new Error(`Invalid data first byte ${nextByte}`);
            }
        }

        return data;
    }

    private parseExtension(): GifData<B> {
        const extensionLabel = this.bytes.readUint8(this.cursor + 1);
        switch (extensionLabel) {
            case ExtensionLabel.GRAPHIC_CONTROL_EXTENSION:
                return this.parseGraphicBlock(true);
            case ExtensionLabel.COMMENT_EXTENSION:
                return this.parseCommentExtension();
            case ExtensionLabel.APPLICATION_EXTENSION:
                return this.parseApplicationExtension();
            case ExtensionLabel.IMAGE_SEPARATOR:
                this.cursor++;
                return this.parseGraphicBlock(false);
            default:
                throw new Error(`Error in parsing extension, unknown extension label ${extensionLabel}`);
        }
    }

    private parseGraphicBlock(withExtensions: boolean): GifGraphicBlock<B> {
        const graphicControlExtension = withExtensions ? this.parseGraphicControlExtension() : null;
        const otherExtensions: GifExtension<B>[] = [];
        let graphicRenderingBlock: GifGraphicRenderingBlock<B>;

        if (withExtensions) {
            let nextByte: number;
            for (
                nextByte = this.bytes.readUint8(this.cursor);
                nextByte === EXTENSION_INTRODUCER;
                nextByte = this.bytes.readUint8(this.cursor)
            ) {
                const extensionLabel = this.bytes.readUint8(this.cursor + 1);

                if (extensionLabel === ExtensionLabel.PLAINTEXT_EXTENSION) {
                    break;
                }

                const extension = this.parseExtension();
                otherExtensions.push(extension as any);
            }

            switch (nextByte) {
                case EXTENSION_INTRODUCER:
                    graphicRenderingBlock = this.parsePlainTextExtension();
                    break;
                case ExtensionLabel.IMAGE_SEPARATOR:
                    graphicRenderingBlock = this.parseTableBasedImage();
                    break;
                default:
                    throw new Error(`Error in parsing graphic rendering block, unknown block type ${nextByte}`);
            }
        } else {
            graphicRenderingBlock = this.parseTableBasedImage();
        }

        return {
            graphicControlExtension,
            otherExtensions,
            graphicRenderingBlock
        };
    }

    private parseGraphicControlExtension(): GifGraphicControlExtension<B> {
        const result = this.instantiateGraphicControlExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseTableBasedImage(): GifTableBasedImage<B> {
        const descriptor = this.parseImageDescriptor();

        return {
            descriptor,
            localColorTable: this.parseColorTable(
                descriptor.packedFields.value.localColorTableFlag,
                descriptor.packedFields.value.localColorTableSize
            ),
            data: this.parseTableBasedImageData()
        };
    }

    private parseImageDescriptor(): GifImageDescriptor<B> {
        const result = this.instantiateImageDescriptor(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseTableBasedImageData(): GifTableBasedImageData<B> {
        const result = this.instantiateTableBasedImageData(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parsePlainTextExtension(): GifPlainTextExtension<B> {
        const result = this.instantiatePlainTextExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseApplicationExtension(): GifApplicationExtension<B> {
        const result = this.instantiateApplicationExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseCommentExtension(): GifCommentExtension<B> {
        const result = this.instantiateCommentExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    protected abstract bytesToBytesView(bytes: B): BytesView<B>;
    protected abstract instantiateHeader(bytes: BytesView<B>, cursor: number): GifHeader<B>;
    protected abstract instantiateLogicalScreenDescriptor(
        bytes: BytesView<B>,
        cursor: number
    ): GifLogicalScreenDescriptor<B>;
    protected abstract instantiateColor(bytes: BytesView<B>, cursor: number): GifColor<B>;
    protected abstract instantiateGraphicControlExtension(
        bytes: BytesView<B>,
        cursor: number
    ): GifGraphicControlExtension<B>;
    protected abstract instantiateImageDescriptor(bytes: BytesView<B>, cursor: number): GifImageDescriptor<B>;
    protected abstract instantiateTableBasedImageData(bytes: BytesView<B>, cursor: number): GifTableBasedImageData<B>;
    protected abstract instantiatePlainTextExtension(bytes: BytesView<B>, cursor: number): GifPlainTextExtension<B>;
    protected abstract instantiateApplicationExtension(bytes: BytesView<B>, cursor: number): GifApplicationExtension<B>;
    protected abstract instantiateCommentExtension(bytes: BytesView<B>, cursor: number): GifCommentExtension<B>;
}
