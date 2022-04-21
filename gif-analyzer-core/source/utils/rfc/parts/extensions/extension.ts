import { BytesView, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

import { EXTENSION_INTRODUCER } from '@/types';

import { WithInstantiator } from '@/utils/instantiator';

export interface GifExtensionRaw<B> {
    introducer: B;
    label: B;
}

export interface GifExtensionValue {
    introducer: number;
    label: number;
}

export abstract class GifExtension<B> extends WithInstantiator<B> {
    public introducer: Uint8BytesMirror<B>;
    public label: Uint8BytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseIntro(gifBytes, offset);
    }

    protected parseIntro(gifBytes: BytesView<B>, offset: number): void {
        this.introducer = this.instantiator.uint8BytesMirror(gifBytes.slice(offset, offset + 1));
        this.label = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 1, offset + 2));
    }

    protected get introSize(): number {
        return this.introducer.size + this.label.size;
    }

    get isValid(): boolean {
        return this.introducer.value === EXTENSION_INTRODUCER;
    }

    abstract get raw(): GifExtensionRaw<B>;
    abstract get value(): GifExtensionValue;
    abstract get size(): number;
}
