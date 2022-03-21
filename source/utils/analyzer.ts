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

        this._rfcParts.header = this.parseHeader(0);
        this._rfcParts.logicalScreenDescriptor = this.parseLogicalScreenDescriptor(6);
    }

    private parseHeaderSignature(startIndex: number): string {
        const signatureBytes = this.bytes.slice(startIndex, startIndex + 3);

        if (signatureBytes.length !== 3) {
            throw new Error('Error in parsing signature, not enough bytes');
        }

        const signature = signatureBytes.toString();
        if (signature !== 'GIF') {
            console.warn('Error in parsing signature, not a gif');
        }

        return signature;
    }

    private parseHeaderVersion(startIndex: number): string {
        const versionBytes = this.bytes.slice(startIndex, startIndex + 3);

        if (versionBytes.length !== 3) {
            throw new Error('Error in parsing version, not enough bytes');
        }

        const version = versionBytes.toString() as Version;
        if (!GifAnalyzer.VERSIONS.includes(version)) {
            console.warn('Error in parsing version, not a valid version');
        }

        return version;
    }

    private parseHeader(startIndex: number): GifRfcPartsHeader {
        const headerBytes = this.bytes.slice(startIndex, startIndex + 6);

        if (headerBytes.length !== 6) {
            throw new Error('Error in parsing header, not enough bytes');
        }

        return {
            signature: this.parseHeaderSignature(startIndex),
            version: this.parseHeaderVersion(startIndex + 3)
        };
    }

    private parseLogicalScreenDescriptor(startIndex: number): GifRfcPartsLogicalScreenDescriptor {
        const logicalScreenDescriptorBytes = this.bytes.slice(startIndex, startIndex + 7);

        if (logicalScreenDescriptorBytes.length !== 7) {
            throw new Error('Error in parsing logical screen descriptor, not enough bytes');
        }

        const packedFields = logicalScreenDescriptorBytes.readUint8(4);
        return {
            width: logicalScreenDescriptorBytes.readUInt16LE(0),
            height: logicalScreenDescriptorBytes.readUInt16LE(2),
            packedFields: {
                globalColorTableFlag: readBits(packedFields, 0, 1) as any,
                colorResolution: readBits(packedFields, 1, 4),
                sortFlag: readBits(packedFields, 4, 5) as any,
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
