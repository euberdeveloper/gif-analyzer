import { BytesView, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

import { WithInstantiator } from '@/utils/instantiator';

export interface GifColorRaw<B> {
    red: B;
    green: B;
    blue: B;
}

export interface GifColorValue {
    red: number;
    green: number;
    blue: number;
}

export abstract class GifColor<B> extends WithInstantiator<B> {
    public red: Uint8BytesMirror<B>;
    public green: Uint8BytesMirror<B>;
    public blue: Uint8BytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.red = this.instantiator.uint8BytesMirror(gifBytes.slice(offset, offset + 1));
        this.green = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 1, offset + 2));
        this.blue = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 2, offset + 3));
    }

    get isValid(): boolean {
        return true;
    }

    get size(): number {
        return this.red.size + this.green.size + this.blue.size;
    }

    get raw(): GifColorRaw<B> {
        return {
            red: this.red.bytes,
            green: this.green.bytes,
            blue: this.blue.bytes
        };
    }

    get value(): GifColorValue {
        return {
            red: this.red.value,
            green: this.green.value,
            blue: this.blue.value
        };
    }
}
