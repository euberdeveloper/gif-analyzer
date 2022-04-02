import { EXTENSION_INTRODUCER } from '@/types';
import { ByteBufferMirror, StringBufferMirror } from '../bufferMirror';

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

    get isValid(): boolean {
        return this.introducer.value === EXTENSION_INTRODUCER;
    }

    protected get introSize(): number {
        return this.introducer.size + this.label.size;
    }
}
