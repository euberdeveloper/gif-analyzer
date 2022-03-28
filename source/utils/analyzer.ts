import {
    GifDataStream,
    GifHeader,
    GifLogicalScreenDescriptor,
    GifData,
    GifGraphicControlExtension,
    GifGraphicBlock,
    GifGraphicRenderingBlock,
    GifTableBasedImage,
    GifImageDescriptor,
    GifColorTable,
    GifImageData,
    GifCommentExtension,
    GifPlainTextExtension,
    GifApplicationExtension
} from '@/types';
import { ExtensionLabel, EXTENSION_INTRODUCER, IMAGE_SEPARATOR, Version } from './constants';
import { readBits } from './parsing';

export * from './constants';

export class GifAnalyzer {
    private static readonly VERSIONS = Object.values(Version);

    private readonly bytes: Buffer;
    private _rfcParts: GifDataStream;
    private cursor = 0;

    get rfcParts(): GifDataStream {
        return this._rfcParts;
    }

    get version(): Version {
        return this._rfcParts.header.version as Version;
    }

    get globalColorTableExists(): boolean {
        return this._rfcParts.logicalScreen.logicalScreenDescriptor.packedFields.globalColorTableFlag;
    }

    get globalColorTableSize(): number {
        return 2 ** (this._rfcParts.logicalScreen.logicalScreenDescriptor.packedFields.globalColorTableSize + 1);
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this.parse();
    }

    private parse(): void {
        this._rfcParts = {
            logicalScreen: {}
        } as GifDataStream;

        this._rfcParts.header = this.parseHeader();
        this._rfcParts.logicalScreen.logicalScreenDescriptor = this.parseLogicalScreenDescriptor();
        this._rfcParts.logicalScreen.globalColorTable = this.globalColorTableExists
            ? this.parseColorTable(this.globalColorTableSize)
            : null;
        this._rfcParts.data = this.parseData();
    }

    private parseHeaderSignature(): string {
        const signatureBytes = this.bytes.slice(this.cursor, this.cursor + 3);
        this.cursor += 3;

        if (signatureBytes.length !== 3) {
            throw new Error('Error in parsing signature, not enough bytes');
        }

        const signature = signatureBytes.toString();
        if (signature !== 'GIF') {
            console.warn('Error in parsing signature, not a gif');
        }

        return signature;
    }

    private parseHeaderVersion(): string {
        const versionBytes = this.bytes.slice(this.cursor, this.cursor + 3);
        this.cursor += 3;

        if (versionBytes.length !== 3) {
            throw new Error('Error in parsing version, not enough bytes');
        }

        const version = versionBytes.toString() as Version;
        if (!GifAnalyzer.VERSIONS.includes(version)) {
            console.warn('Error in parsing version, not a valid version');
        }

        return version;
    }

    private parseHeader(): GifHeader {
        const headerBytes = this.bytes.slice(this.cursor, this.cursor + 6);

        if (headerBytes.length !== 6) {
            throw new Error('Error in parsing header, not enough bytes');
        }

        return {
            signature: this.parseHeaderSignature(),
            version: this.parseHeaderVersion()
        };
    }

    private parseLogicalScreenDescriptor(): GifLogicalScreenDescriptor {
        const logicalScreenDescriptorBytes = this.bytes.slice(this.cursor, this.cursor + 7);
        this.cursor += 7;

        if (logicalScreenDescriptorBytes.length !== 7) {
            throw new Error('Error in parsing logical screen descriptor, not enough bytes');
        }

        const packedFields = logicalScreenDescriptorBytes.readUint8(4);
        return {
            width: logicalScreenDescriptorBytes.readUInt16LE(0),
            height: logicalScreenDescriptorBytes.readUInt16LE(2),
            packedFields: {
                globalColorTableFlag: readBits(packedFields, 0, 1) === 1,
                colorResolution: readBits(packedFields, 1, 4),
                sortFlag: readBits(packedFields, 4, 5) === 1,
                globalColorTableSize: readBits(packedFields, 5, 8)
            },
            backgroundColorIndex: logicalScreenDescriptorBytes.readUInt8(5),
            pixelAspectRatio: logicalScreenDescriptorBytes.readUInt8(6)
        };
    }

    private parseColorTable(size: number): GifColorTable {
        const colorTable: GifColorTable = [];

        for (let i = 0; i < size; i++) {
            const colourBytes = this.bytes.slice(this.cursor, this.cursor + 3);
            this.cursor += 3;

            if (colourBytes.length !== 3) {
                throw new Error('Error in parsing color table, not enough bytes');
            }

            colorTable.push({
                red: colourBytes.readUInt8(0),
                green: colourBytes.readUInt8(1),
                blue: colourBytes.readUInt8(2)
            });
        }

        return colorTable;
    }

    private parseGraphicControlExtension(): GifGraphicControlExtension {
        const graphicControlExtensionBytes = this.bytes.slice(this.cursor, this.cursor + 5);
        this.cursor += 5;

        if (graphicControlExtensionBytes.length !== 5) {
            throw new Error('Error in parsing graphic control extension, not enough bytes');
        }

        const blockTerminator = this.bytes.readUInt8(this.cursor++);
        if (blockTerminator !== 0) {
            console.warn('Error in parsing graphic control extension, block terminator not 0');
        }

        const packedBits = graphicControlExtensionBytes.readUInt8(1);
        return {
            extensionIntroducer: EXTENSION_INTRODUCER,
            extensionLabel: ExtensionLabel.GRAPHIC_CONTROL_EXTENSION,
            blockSize: graphicControlExtensionBytes.readUInt8(0),
            packedFields: {
                reserved: readBits(packedBits, 0, 3),
                disposalMethod: readBits(packedBits, 3, 6),
                userInputFlag: readBits(packedBits, 6, 7) === 1,
                transparentColorFlag: readBits(packedBits, 7, 8) === 1
            },
            delayTime: graphicControlExtensionBytes.readUInt16LE(2),
            transparentColorIndex: graphicControlExtensionBytes.readUInt8(4),
            blockTerminator: blockTerminator
        };
    }

    private parseTableBasedImage(): GifTableBasedImage {
        const imageDescriptor = this.parseImageDescriptor();

        return {
            imageDescriptor,
            localColorTable: imageDescriptor.packedFields.localColorTableFlag
                ? this.parseColorTable(imageDescriptor.packedFields.localColorTableSize)
                : null,
            imageData: this.parseImageData()
        };
    }

    private parseImageData(): GifImageData {
        const data: GifImageData = [];

        let value: number;
        do {
            value = this.bytes.readUInt8(this.cursor++);
            data.push(value);
        } while (value !== 0);

        return data;
    }

    private parseImageDescriptor(): GifImageDescriptor {
        const imageDescriptor = this.bytes.slice(this.cursor, this.cursor + 9);
        this.cursor += 9;

        if (imageDescriptor.length !== 7) {
            throw new Error('Error in parsing image descriptor, not enough bytes');
        }

        const packedFields = imageDescriptor.readUint8(8);
        return {
            leftPosition: imageDescriptor.readUInt16LE(0),
            topPosition: imageDescriptor.readUInt16LE(2),
            width: imageDescriptor.readUInt16LE(4),
            height: imageDescriptor.readUInt16LE(6),
            packedFields: {
                localColorTableFlag: readBits(packedFields, 0, 1) === 1,
                interlaceFlag: readBits(packedFields, 1, 2) === 1,
                sortFlag: readBits(packedFields, 2, 3) === 1,
                reserved: readBits(packedFields, 3, 5),
                localColorTableSize: readBits(packedFields, 5, 8)
            }
        };
    }

    private parseGraphicRenderingBlock(): GifGraphicRenderingBlock {
        const nextByte = this.bytes.readUInt8(this.cursor++);

        switch (nextByte) {
            case EXTENSION_INTRODUCER:
                const extensionLabel = this.bytes.readUInt8(this.cursor++);
                switch (extensionLabel) {
                    case ExtensionLabel.PLAINTEXT_EXTENSION:
                        return this.parsePlainTextExtension();
                    case ExtensionLabel.APPLICATION_EXTENSION:
                        return this.parseApplicationExtension();
                    default:
                        throw new Error(
                            `Error in parsing graphic rendering block, not an allowed extension ${extensionLabel}`
                        );
                }
            case IMAGE_SEPARATOR:
                return this.parseTableBasedImage();
            default:
                throw new Error(`Error in parsing graphic rendering block, unknown block type ${nextByte}`);
        }
    }

    private parseDataSubBlocks<T>(subBlockParser: (subBlock: Buffer) => T): T[] {
        const parsedBlocks: T[] = [];
        for (
            let nextBlockSize = this.bytes.readUInt8(this.cursor++);
            nextBlockSize !== 0;
            nextBlockSize = this.bytes.readUInt8(this.cursor++)
        ) {
            const block = this.bytes.slice(this.cursor, this.cursor + nextBlockSize);
            parsedBlocks.push(subBlockParser(block));
            this.cursor += nextBlockSize;
        }

        return parsedBlocks;
    }

    private parseCommentExtension(): GifCommentExtension {
        const textParts = this.parseDataSubBlocks(subBlock => subBlock.toString('ascii'));
        return {
            extensionIntroducer: EXTENSION_INTRODUCER,
            extensionLabel: ExtensionLabel.COMMENT_EXTENSION,
            text: textParts.join(''),
            blockTerminator: 0
        };
    }

    private parsePlainTextExtension(): GifPlainTextExtension {
        const blockSize = this.bytes.readUInt8(this.cursor++);
        if (blockSize !== 12) {
            console.warn('Warning in parsing plain text extension, block size not 12');
        }

        const metadataBytes = this.bytes.slice(this.cursor, this.cursor + 12);
        this.cursor += 12;

        if (metadataBytes.length !== 12) {
            throw new Error('Error in parsing plain text extension, not enough bytes');
        }

        const textParts = this.parseDataSubBlocks(subBlock => subBlock.toString('ascii'));
        return {
            extensionIntroducer: EXTENSION_INTRODUCER,
            extensionLabel: ExtensionLabel.PLAINTEXT_EXTENSION,
            blockSize,
            textGridLeftPosition: metadataBytes.readUint16LE(0),
            textGridTopPosition: metadataBytes.readUint16LE(2),
            textGridWidth: metadataBytes.readUint16LE(4),
            textGridHeight: metadataBytes.readUint16LE(6),
            characterCellWidth: metadataBytes.readUint8(8),
            characterCellHeight: metadataBytes.readUint8(9),
            textForegroundColorIndex: metadataBytes.readUint8(10),
            textBackgroundColorIndex: metadataBytes.readUint8(11),
            text: textParts.join(''),
            blockTerminator: 0
        };
    }

    private parseApplicationExtension(): GifApplicationExtension {
        const blockSize = this.bytes.readUInt8(this.cursor++);
        if (blockSize !== 11) {
            console.warn('Warning in parsing application extension, block size not 11');
        }

        const metadataBytes = this.bytes.slice(this.cursor, this.cursor + 11);
        this.cursor += 11;

        if (metadataBytes.length !== 11) {
            throw new Error('Error in parsing application extension, not enough bytes');
        }

        const dataParts = this.parseDataSubBlocks(subBlock => [...subBlock]);
        return {
            extensionIntroducer: EXTENSION_INTRODUCER,
            extensionLabel: ExtensionLabel.APPLICATION_EXTENSION,
            blockSize,
            applicationIdentifier: metadataBytes.slice(0, 8).toString('ascii'),
            applicationAuthenticationCode: [...metadataBytes.slice(8, 11)],
            data: dataParts.flat(),
            blockTerminator: 0
        };
    }

    private parseExtension(): GifData {
        const extensionLabel = this.bytes.readUInt8(this.cursor++);
        switch (extensionLabel) {
            case ExtensionLabel.GRAPHIC_CONTROL_EXTENSION:
                const merda = this.parseGraphicControlExtension();
                const block: GifGraphicBlock = {
                    graphicControlExtension: merda,
                    graphicRenderingBlock: this.parseGraphicRenderingBlock()
                };
                return block;
            case ExtensionLabel.COMMENT_EXTENSION:
                return this.parseCommentExtension();
            case ExtensionLabel.PLAINTEXT_EXTENSION:
                return this.parsePlainTextExtension();
            case ExtensionLabel.APPLICATION_EXTENSION:
                return this.parseApplicationExtension();
            default:
                throw new Error(`Invalid extension label ${extensionLabel}`);
        }
    }

    private parseData(): GifData[] {
        const data: GifData[] = [];

        const nextByte = this.bytes.readUInt8(this.cursor++);

        switch (nextByte) {
            case EXTENSION_INTRODUCER:
                const block = this.parseExtension();
                data.push(block);
                break;
            case IMAGE_SEPARATOR:
                const graphicBlock: GifGraphicBlock = {
                    graphicControlExtension: null,
                    graphicRenderingBlock: this.parseGraphicRenderingBlock()
                };
                data.push(graphicBlock);
                break;
            default:
                throw new Error(`Invalid data first byte ${nextByte}`);
        }

        return data;
    }
}
