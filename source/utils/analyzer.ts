import { GifHeader, GifRfc, GifLogicalScreenDescriptor, GifRfcValue, rfcToValue, GifRfcRaw, rfcToRaw } from './rfc';

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
