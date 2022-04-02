import {
    GifHeader,
    GifRfc,
    GifLogicalScreenDescriptor,
    GifRfcValue,
    rfcToValue,
    GifRfcRaw,
    rfcToRaw,
    GifColor
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
            logicalScreen: this.parseLogicalScreen()
        };
    }

    private parseHeader(): GifHeader {
        const result = new GifHeader(this.bytes, this.cursor);
        this.cursor += result.size;
        return result;
    }

    private parseLogicalScreen(): { descriptor: GifLogicalScreenDescriptor; globalColorTable: GifColor[] | null } {
        const descriptor = this.parseLogicalScreenDescriptor();
        const globalColorTable = this.parseGlobalColorTable(
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

    private parseGlobalColorTable(exists: boolean, size: number): GifColor[] | null {
        if (exists) {
            const handledSize = 2 ** size;
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
}
