import { GifHeader, GifRfc, GifLogicalScreenDescriptor } from './rfc';

export class GifAnalyzer {
    private readonly bytes: Buffer;
    private readonly _rfcParts: GifRfc;
    private cursor = 0;

    get value(): GifRfc {
        return this._rfcParts;
    }

    constructor(bytes: Buffer) {
        this.bytes = bytes;
        this._rfcParts = {
            header: this.parseHeader(),
            logicalScreen: {
                descriptor: this.parseLogicalScreenDescriptor()
            }
        };
    }

    private parseHeader(): GifHeader {
        const result = new GifHeader(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseLogicalScreenDescriptor(): GifLogicalScreenDescriptor {
        const result = new GifLogicalScreenDescriptor(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }
}
