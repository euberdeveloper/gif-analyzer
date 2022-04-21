import { BytesView, StringBytesMirror, Uint16LEBytesMirror } from '@blackmirror/bytes-mirror';

import { WithInstantiator } from '@/utils/instantiator';
import { ImageDescriptorPackedFields, ImageDescriptorPackedFieldsBytesMirror } from '@/utils/mirrors';

export interface GifImageDescriptorRaw<B> {
    imageSeparator: B;
    leftPosition: B;
    topPosition: B;
    width: B;
    height: B;
    packedFields: B;
}

export interface GifImageDescriptorValue {
    imageSeparator: string;
    leftPosition: number;
    topPosition: number;
    width: number;
    height: number;
    packedFields: ImageDescriptorPackedFields;
}

export abstract class GifImageDescriptor<B> extends WithInstantiator<B> {
    public imageSeparator: StringBytesMirror<B>;
    public leftPosition: Uint16LEBytesMirror<B>;
    public topPosition: Uint16LEBytesMirror<B>;
    public width: Uint16LEBytesMirror<B>;
    public height: Uint16LEBytesMirror<B>;
    public packedFields: ImageDescriptorPackedFieldsBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.imageSeparator = this.instantiator.stringBytesMirror(gifBytes.slice(offset, offset + 1));
        this.leftPosition = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 1, offset + 3));
        this.topPosition = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 3, offset + 5));
        this.width = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 5, offset + 7));
        this.height = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 7, offset + 9));
        this.packedFields = this.instantiator.imageDescriptorPackedFieldsBytesMirror(
            gifBytes.slice(offset + 9, offset + 10)
        );
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

    get raw(): GifImageDescriptorRaw<B> {
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
