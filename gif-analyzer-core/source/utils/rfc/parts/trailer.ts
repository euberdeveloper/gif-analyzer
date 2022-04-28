import { BytesView, StringBytesMirror } from '@blackmirror/bytes-mirror';

import { WithInstantiator } from '@/utils/instantiator';

export interface GifTrailerRaw<B> {
    trailer: B;
}

export interface GifTrailerValue {
    trailer: string;
}

export abstract class GifTrailer<B> extends WithInstantiator<B> {
    public trailer: StringBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.trailer = this.instantiator.stringBytesMirror(gifBytes.slice(offset, offset + 1));
    }

    get isValid(): boolean {
        return this.trailer.value === ';';
    }

    get size(): number {
        return this.trailer.size;
    }

    get raw(): GifTrailerRaw<B> {
        return {
            trailer: this.trailer.bytes
        };
    }

    get value(): GifTrailerValue {
        return {
            trailer: this.trailer.value
        };
    }
}
