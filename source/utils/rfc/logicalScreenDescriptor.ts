import { ByteBufferMirror, Uint16LEBufferMirror } from '../bufferMirror';

export class GifLogicalScreenDescriptor {
    public width: Uint16LEBufferMirror;
    public height: Uint16LEBufferMirror;
    public packedFields: ByteBufferMirror;
    public backgroundColorIndex: ByteBufferMirror;
    public pixelAspectRatio: ByteBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.width = new Uint16LEBufferMirror(gifBytes.slice(offset, offset + 2));
        this.height = new Uint16LEBufferMirror(gifBytes.slice(offset + 2, offset + 4));
        this.packedFields = new ByteBufferMirror(gifBytes.slice(offset + 4, offset + 5));
        this.backgroundColorIndex = new ByteBufferMirror(gifBytes.slice(offset + 5, offset + 6));
        this.pixelAspectRatio = new ByteBufferMirror(gifBytes.slice(offset + 6, offset + 7));
    }

    get isValid(): boolean {
        return true;
    }

    get size(): number {
        return (
            this.width.size +
            this.height.size +
            this.packedFields.size +
            this.backgroundColorIndex.size +
            this.pixelAspectRatio.size
        );
    }
}
