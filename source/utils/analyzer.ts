import { GifHeader } from './rfc/header';

export class GifAnalyzer {
    private readonly bytes: Buffer;
    private readonly _rfcParts: any;
    private cursor = 0;

    private header: GifHeader;

    get parsedBytes() {
        return {
            header: this.header.signature.bytes,
            version: this.header.version.bytes
        };
    }

    get parsedValue() {
        return {
            header: this.header.signature.value,
            version: this.header.version.value
        };
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this.parse();
    }

    private parse(): void {
        this.header = this.parseHeader();
    }

    private parseHeader(): GifHeader {
        const result = new GifHeader(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }
}
