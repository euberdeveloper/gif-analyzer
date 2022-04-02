import {
    ByteBufferMirror,
    Uint16LEBufferMirror,
    ImageDescriptorPackedFieldsBufferMirror,
    ImageDescriptorPackedFields
} from '@/utils/bufferMirror';

export interface GifImageDescriptorRaw {
    width: Buffer;
    height: Buffer;
    packedFields: Buffer;
    backgroundColorIndex: Buffer;
    pixelAspectRatio: Buffer;
}

export interface GifImageDescriptorValue {
    width: number;
    height: number;
    packedFields: ImageDescriptorPackedFields;
    backgroundColorIndex: number;
    pixelAspectRatio: number;
}

export class GifImageDescriptor {
    public width: Uint16LEBufferMirror;
    public height: Uint16LEBufferMirror;
    public packedFields: ImageDescriptorPackedFieldsBufferMirror;
    public backgroundColorIndex: ByteBufferMirror;
    public pixelAspectRatio: ByteBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.width = new Uint16LEBufferMirror(gifBytes.slice(offset, offset + 2));
        this.height = new Uint16LEBufferMirror(gifBytes.slice(offset + 2, offset + 4));
        this.packedFields = new ImageDescriptorPackedFieldsBufferMirror(gifBytes.slice(offset + 4, offset + 5));
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

    get raw(): GifImageDescriptorRaw {
        return {
            width: this.width.bytes,
            height: this.height.bytes,
            packedFields: this.packedFields.bytes,
            backgroundColorIndex: this.backgroundColorIndex.bytes,
            pixelAspectRatio: this.pixelAspectRatio.bytes
        };
    }

    get value(): GifImageDescriptorValue {
        return {
            width: this.width.value,
            height: this.height.value,
            packedFields: this.packedFields.value,
            backgroundColorIndex: this.backgroundColorIndex.value,
            pixelAspectRatio: this.pixelAspectRatio.value
        };
    }
}
