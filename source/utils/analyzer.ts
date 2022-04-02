import { ExtensionLabel, EXTENSION_INTRODUCER, IMAGE_SEPARATOR, TRAILER } from '@/types';
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

export class GifAnalyzer {
    private readonly bytes: Buffer;
    private readonly _rfc: GifRfc;
    private cursor = 0;

    get rfc(): GifRfc {
        return this._rfc;
    }

    get raw(): GifRfcRaw {
        return rfcToRaw(this._rfc);
    }

    get value(): GifRfcValue {
        return rfcToValue(this._rfc);
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this._rfc = {
            header: this.parseHeader(),
            logicalScreen: this.parseLogicalScreen(),
            data: this.parseData()
        };
    }

    private parseHeader(): GifHeader {
        const result = new GifHeader(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseLogicalScreen(): { descriptor: GifLogicalScreenDescriptor; globalColorTable: GifColor[] | null } {
        const descriptor = this.parseLogicalScreenDescriptor();
        const globalColorTable = this.parseColorTable(
            descriptor.packedFields.value.globalColorTableFlag,
            descriptor.packedFields.value.globalColorTableSize
        );
        return { descriptor, globalColorTable };
    }

    private parseLogicalScreenDescriptor(): GifLogicalScreenDescriptor {
        const result = new GifLogicalScreenDescriptor(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseColorTable(exists: boolean, size: number): GifColor[] | null {
        if (exists) {
            const handledSize = 2 ** (size + 1);
            const colorTable: GifColor[] = [];

            for (let i = 0; i < handledSize; i++) {
                const color = new GifColor(this.bytes, this.cursor);
                colorTable.push(color);
                this.cursor += color.size;
            }

            return colorTable;
        } else {
            return null;
        }
    }

    private parseData(): GifData[] {
        const data: GifData[] = [];

        for (
            let nextByte = this.bytes.readUInt8(this.cursor);
            nextByte !== TRAILER;
            nextByte = this.bytes.readUInt8(this.cursor)
        ) {
            switch (nextByte) {
                case EXTENSION_INTRODUCER:
                    data.push(this.parseExtension());
                    break;
                case IMAGE_SEPARATOR:
                    this.cursor++;
                    data.push(this.parseGraphicBlock(false));
                    break;
                default:
                    throw new Error(`Invalid data first byte ${nextByte}`);
            }
        }

        return data;
    }

    private parseExtension(): GifData {
        const extensionLabel = this.bytes.readUInt8(this.cursor + 1);
        switch (extensionLabel) {
            case ExtensionLabel.GRAPHIC_CONTROL_EXTENSION:
                return this.parseGraphicBlock(true);
            case ExtensionLabel.COMMENT_EXTENSION:
                return this.parseCommentExtension();
            case ExtensionLabel.APPLICATION_EXTENSION:
                return this.parseApplicationExtension();
            case IMAGE_SEPARATOR:
                this.cursor++;
                return this.parseGraphicBlock(false);
            default:
                throw new Error(`Error in parsing extension, unknown extension label ${extensionLabel}`);
        }
    }

    private parseGraphicBlock(withExtensions: boolean): GifGraphicBlock {
        const graphicControlExtension = withExtensions ? this.parseGraphicControlExtension() : null;
        const otherExtensions: GifExtension[] = [];
        let graphicRenderingBlock: GifGraphicRenderingBlock;

        if (withExtensions) {
            let nextByte: number, extensionLabel: number;
            for (
                nextByte = this.bytes.readUInt8(this.cursor);
                nextByte === EXTENSION_INTRODUCER;
                nextByte = this.bytes.readUInt8(this.cursor)
            ) {
                extensionLabel = this.bytes.readUInt8(this.cursor);

                if (extensionLabel === ExtensionLabel.PLAINTEXT_EXTENSION) {
                    break;
                }

                const extension = this.parseExtension() as GifExtension;
                otherExtensions.push(extension);
                this.cursor += extension.size;
            }

            switch (nextByte) {
                case EXTENSION_INTRODUCER:
                    graphicRenderingBlock = this.parsePlainTextExtension();
                    break;
                case IMAGE_SEPARATOR:
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

    private parseGraphicControlExtension(): GifGraphicControlExtension {
        const result = new GifGraphicControlExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseTableBasedImage(): GifTableBasedImage {
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

    private parseImageDescriptor(): GifImageDescriptor {
        const result = new GifImageDescriptor(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseTableBasedImageData(): GifTableBasedImageData {
        const result = new GifTableBasedImageData(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parsePlainTextExtension(): GifPlainTextExtension {
        const result = new GifPlainTextExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseApplicationExtension(): GifApplicationExtension {
        const result = new GifApplicationExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseCommentExtension(): GifCommentExtension {
        const result = new GifCommentExtension(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }
}
