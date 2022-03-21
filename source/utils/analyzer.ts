export enum Version {
    V_87A = '87a',
    V_89A = '89a'
}

export interface GifRfcPartsHeader {
    signature: string;
    version: string;
}

export interface GifRfcParts {
    header: GifRfcPartsHeader;
}

export class GifAnalyzer {
    private static readonly VERSIONS = Object.values(Version);

    private readonly bytes: Buffer;
    private rfcParts: GifRfcParts;

    get version(): Version {
        return this.rfcParts.header.version as Version;
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this.parse();
    }

    public parse(): void {
        this.rfcParts = {} as GifRfcParts;

        this.rfcParts.header = this.parseHeader(0);
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
        if (GifAnalyzer.VERSIONS.includes(version)) {
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
}
