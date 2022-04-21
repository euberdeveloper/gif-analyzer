import { WithInstantiator } from '@/utils/instantiator';
import { StringSubBlocksBytesMirror } from '@/utils/mirrors';
import { getDataSubBlocksSize } from '@/utils/parsing';
import { BytesView, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

export interface GifTableBasedImageDataRaw<B> {
    lzwMinimumCodeSize: B;
    data: B;
}

export interface GifTableBasedImageDataValue {
    lzwMinimumCodeSize: number;
    data: string;
}

export abstract class GifTableBasedImageData<B> extends WithInstantiator<B> {
    public lzwMinimumCodeSize: Uint8BytesMirror<B>;
    public data: StringSubBlocksBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    protected parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.lzwMinimumCodeSize = this.instantiator.uint8BytesMirror(gifBytes.slice(offset, offset + 1));

        const dataOffset = offset + 1;
        const dataSize = getDataSubBlocksSize(gifBytes, dataOffset);
        this.data = this.instantiator.stringSubBlocksBytesMirror(gifBytes.slice(dataOffset, dataOffset + dataSize));
    }

    get isValid(): boolean {
        return true; // TODO: add valid checks
    }

    get size(): number {
        return this.lzwMinimumCodeSize.size + this.data.size;
    }

    get raw(): GifTableBasedImageDataRaw<B> {
        return {
            lzwMinimumCodeSize: this.lzwMinimumCodeSize.bytes,
            data: this.data.bytes
        };
    }

    get value(): GifTableBasedImageDataValue {
        return {
            lzwMinimumCodeSize: this.lzwMinimumCodeSize.value,
            data: this.data.value
        };
    }
}
