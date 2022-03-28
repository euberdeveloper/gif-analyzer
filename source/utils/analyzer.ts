import { GifDataStream, GifHeader, GifLogicalScreenDescriptor, GifColor } from '@/types';

export enum Version {
    V_87A = '87a',
    V_89A = '89a'
}

function readBits(byte: number, start: number, end: number): number {
    let mask = 0;
    for (let i = 0; i < 8; i++) {
        mask <<= 1;
        mask += i >= start && i < end ? 1 : 0;
    }

    return (byte & mask) >> (8 - end);
}

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
        this._rfcParts.logicalScreen.globalColorTable = this.parseGlobalColorTable();
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

    private parseGlobalColorTable(): GifColor[] | null {
        let globalColorTable: GifColor[] | null = null;

        if (this.globalColorTableExists) {
            globalColorTable = [];

            for (let i = 0; i < this.globalColorTableSize; i++) {
                const colourBytes = this.bytes.slice(this.cursor, this.cursor + 3);
                this.cursor += 3;

                if (colourBytes.length !== 3) {
                    throw new Error('Error in parsing global color table, not enough bytes');
                }

                globalColorTable.push({
                    red: colourBytes.readUInt8(0),
                    green: colourBytes.readUInt8(1),
                    blue: colourBytes.readUInt8(2)
                });
            }
        }

        return globalColorTable;
    }
}
