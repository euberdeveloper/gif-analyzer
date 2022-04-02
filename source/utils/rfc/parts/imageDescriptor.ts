import {
    Uint16LEBufferMirror,
    ImageDescriptorPackedFieldsBufferMirror,
    ImageDescriptorPackedFields,
    StringBufferMirror
} from '@/utils/bufferMirror';

export interface GifImageDescriptorRaw {
    imageSeparator: Buffer;
    leftPosition: Buffer;
    topPosition: Buffer;
    width: Buffer;
    height: Buffer;
    packedFields: Buffer;
}

export interface GifImageDescriptorValue {
    imageSeparator: string;
    leftPosition: number;
    topPosition: number;
    width: number;
    height: number;
    packedFields: ImageDescriptorPackedFields;
}

export class GifImageDescriptor {
    public imageSeparator: StringBufferMirror;
    public leftPosition: Uint16LEBufferMirror;
    public topPosition: Uint16LEBufferMirror;
    public width: Uint16LEBufferMirror;
    public height: Uint16LEBufferMirror;
    public packedFields: ImageDescriptorPackedFieldsBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.imageSeparator = new StringBufferMirror(gifBytes.slice(offset, offset + 1));
        this.leftPosition = new Uint16LEBufferMirror(gifBytes.slice(offset + 1, offset + 3));
        this.topPosition = new Uint16LEBufferMirror(gifBytes.slice(offset + 3, offset + 5));
        this.width = new Uint16LEBufferMirror(gifBytes.slice(offset + 5, offset + 7));
        this.height = new Uint16LEBufferMirror(gifBytes.slice(offset + 7, offset + 9));
        this.packedFields = new ImageDescriptorPackedFieldsBufferMirror(gifBytes.slice(offset + 9, offset + 10));
    }

    get isValid(): boolean {
        return true;
    }

    get size(): number {
        return (
            this.imageSeparator.size +
            this.leftPosition.size +
            this.topPosition.size +
            this.width.size +
            this.height.size +
            this.packedFields.size
        );
    }

    get raw(): GifImageDescriptorRaw {
        return {
            imageSeparator: this.imageSeparator.bytes,
            leftPosition: this.leftPosition.bytes,
            topPosition: this.topPosition.bytes,
            width: this.width.bytes,
            height: this.height.bytes,
            packedFields: this.packedFields.bytes
        };
    }

    get value(): GifImageDescriptorValue {
        return {
            imageSeparator: this.imageSeparator.value,
            leftPosition: this.leftPosition.value,
            topPosition: this.topPosition.value,
            width: this.width.value,
            height: this.height.value,
            packedFields: this.packedFields.value
        };
    }
}
