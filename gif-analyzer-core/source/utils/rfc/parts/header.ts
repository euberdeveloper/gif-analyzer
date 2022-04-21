import { BytesView, StringBytesMirror } from '@blackmirror/bytes-mirror';

import { WithInstantiator } from '@/utils/instantiator';

export interface GifHeaderRaw<B> {
    signature: B;
    version: B;
}

export interface GifHeaderValue {
    signature: string;
    version: string;
}

export abstract class GifHeader<B> extends WithInstantiator<B> {
    public signature: StringBytesMirror<B>;
    public version: StringBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.signature = this.instantiator.stringBytesMirror(gifBytes.slice(offset, offset + 3));
        this.version = this.instantiator.stringBytesMirror(gifBytes.slice(offset + 3, offset + 6));
    }

    get isValid(): boolean {
        return this.signature.value === 'GIF' && ['87a', '89a'].includes(this.version.value);
    }

    get size(): number {
        return this.signature.size + this.version.size;
    }

    get raw(): GifHeaderRaw<B> {
        return {
            signature: this.signature.bytes,
            version: this.version.bytes
        };
    }

    get value(): GifHeaderValue {
        return {
            signature: this.signature.value,
            version: this.version.value
        };
    }
}
