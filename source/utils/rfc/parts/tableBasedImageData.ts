import { ByteBufferMirror, StringSubBlocksBufferMirror } from '@/utils/bufferMirror';
import { getDataSubBlocksSize } from '@/utils/parsing';

export interface GifTableBasedImageDataRaw {
    lzwMinimumCodeSize: Buffer;
    data: Buffer;
}

export interface GifTableBasedImageDataValue {
    lzwMinimumCodeSize: number;
    data: string;
}

export class GifTableBasedImageData {
    public lzwMinimumCodeSize: ByteBufferMirror;
    public data: StringSubBlocksBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    protected parseBytes(gifBytes: Buffer, offset: number): void {
        this.lzwMinimumCodeSize = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));

        const dataOffset = offset + 1;
        const dataSize = getDataSubBlocksSize(gifBytes, dataOffset);
        this.data = new StringSubBlocksBufferMirror(gifBytes.slice(dataOffset, dataOffset + dataSize));
    }

    get isValid(): boolean {
        return true; // TODO: add valid checks
    }

    get size(): number {
        return this.lzwMinimumCodeSize.size + this.data.size;
    }

    get raw(): GifTableBasedImageDataRaw {
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
