export enum Version {
    V_87A = '87a',
    V_89A = '89a'
}

export interface GifRfcPartsHeader {
    signature: string;
    version: string;
}

export interface GifRfcPartsLogicalScreenDescriptor {
    width: number;
    height: number;
    packedFields: {
        globalColorTableFlag: boolean;
        colorResolution: number;
        sortFlag: boolean;
        globalColorTableSize: number;
    };
    backgroundColorIndex: number;
    pixelAspectRatio: number;
}

export interface GifRfcParts {
    header: GifRfcPartsHeader;
    logicalScreenDescriptor: GifRfcPartsLogicalScreenDescriptor;
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
    private _rfcParts: GifRfcParts;
    private cursor = 0;

    get rfcParts(): GifRfcParts {
        return this._rfcParts;
    }

    get version(): Version {
        return this._rfcParts.header.version as Version;
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this.parse();
    }

    private parse(): void {
        this._rfcParts = {} as GifRfcParts;

        this._rfcParts.header = this.parseHeader();
        this._rfcParts.logicalScreenDescriptor = this.parseLogicalScreenDescriptor();
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

    private parseHeader(): GifRfcPartsHeader {
        const headerBytes = this.bytes.slice(this.cursor, this.cursor + 6);

        if (headerBytes.length !== 6) {
            throw new Error('Error in parsing header, not enough bytes');
        }

        return {
            signature: this.parseHeaderSignature(),
            version: this.parseHeaderVersion()
        };
    }

    private parseLogicalScreenDescriptor(): GifRfcPartsLogicalScreenDescriptor {
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
}

import * as fs from 'fs';
const gif = fs.readFileSync('./test.gif');
const gifAnalyzer = new GifAnalyzer(gif);
console.log(gifAnalyzer.rfcParts);
