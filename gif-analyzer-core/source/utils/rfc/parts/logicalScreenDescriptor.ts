import { WithInstantiator } from '@/utils/instantiator';
import { LogicalDescriptorPackedFields, ScreenLogicalDescriptorPackedFieldsBytesMirror } from '@/utils/mirrors';
import { BytesView, Uint16LEBytesMirror, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

export interface GifLogicalScreenDescriptorRaw<B> {
    width: B;
    height: B;
    packedFields: B;
    backgroundColorIndex: B;
    pixelAspectRatio: B;
}

export interface GifLogicalScreenDescriptorValue {
    width: number;
    height: number;
    packedFields: LogicalDescriptorPackedFields;
    backgroundColorIndex: number;
    pixelAspectRatio: number;
}

export abstract class GifLogicalScreenDescriptor<B> extends WithInstantiator<B> {
    public width: Uint16LEBytesMirror<B>;
    public height: Uint16LEBytesMirror<B>;
    public packedFields: ScreenLogicalDescriptorPackedFieldsBytesMirror<B>;
    public backgroundColorIndex: Uint8BytesMirror<B>;
    public pixelAspectRatio: Uint8BytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super();
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.width = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset, offset + 2));
        this.height = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 2, offset + 4));
        this.packedFields = this.instantiator.screenLogicalDescriptorPackedFieldsBytesMirror(
            gifBytes.slice(offset + 4, offset + 5)
        );
        this.backgroundColorIndex = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 5, offset + 6));
        this.pixelAspectRatio = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 6, offset + 7));
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

    get raw(): GifLogicalScreenDescriptorRaw<B> {
        return {
            width: this.width.bytes,
            height: this.height.bytes,
            packedFields: this.packedFields.bytes,
            backgroundColorIndex: this.backgroundColorIndex.bytes,
            pixelAspectRatio: this.pixelAspectRatio.bytes
        };
    }

    get value(): GifLogicalScreenDescriptorValue {
        return {
            width: this.width.value,
            height: this.height.value,
            packedFields: this.packedFields.value,
            backgroundColorIndex: this.backgroundColorIndex.value,
            pixelAspectRatio: this.pixelAspectRatio.value
        };
    }
}
