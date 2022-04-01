import { StringBufferMirror } from '../bufferMirror/stringBufferMirror';

export class GifHeader {
    public signature: StringBufferMirror;
    public version: StringBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.signature = new StringBufferMirror(gifBytes.slice(offset, offset + 3));
        this.version = new StringBufferMirror(gifBytes.slice(offset + 3, offset + 6));
    }

    get isValid(): boolean {
        return this.signature.value === 'GIF' && ['87a', '89a'].includes(this.version.value);
    }

    get size(): number {
        return this.signature.size + this.version.size;
    }
}
