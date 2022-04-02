import { EXTENSION_INTRODUCER } from '@/types';
import { ByteBufferMirror, StringBufferMirror } from '../bufferMirror';

export interface GifExtensionRaw {
    introducer: Buffer;
    label: Buffer;
    blockTerminator: Buffer;
}

export interface GifExtensionValue {
    introducer: number;
    label: number;
    blockTerminator: string;
}

export abstract class GifExtension {
    public introducer: ByteBufferMirror;
    public label: ByteBufferMirror;
    public blockTerminator: StringBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseIntro(gifBytes, offset);
    }

    protected parseIntro(gifBytes: Buffer, offset: number): void {
        this.introducer = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));
        this.label = new ByteBufferMirror(gifBytes.slice(offset + 1, offset + 2));
    }

    protected parseTerminator(gifBytes: Buffer, offset: number): void {
        this.blockTerminator = new StringBufferMirror(gifBytes.slice(offset + 1, offset + 2));
    }

    protected get introSize(): number {
        return this.introducer.size + this.label.size;
    }

    get isValid(): boolean {
        return this.introducer.value === EXTENSION_INTRODUCER;
    }

    abstract get raw(): GifExtensionRaw;
    abstract get value(): GifExtensionValue;
}
