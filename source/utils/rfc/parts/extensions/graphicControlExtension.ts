import { BytesView, Uint16LEBytesMirror, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

import { GraphicControlBlockPackedFields, GraphicControlBlockPackedFieldsBytesMirror } from '@/utils/mirrors';
import instantiator from '@/utils/instantiator';

import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifGraphicControlExtensionRaw<B> extends GifExtensionRaw<B> {
    blockSize: B;
    packedFields: B;
    delayTime: B;
    transparentColorIndex: B;
    blockTerminator: B;
}

export interface GifGraphicControlExtensionValue extends GifExtensionValue {
    blockSize: number;
    packedFields: GraphicControlBlockPackedFields;
    delayTime: number;
    transparentColorIndex: number;
    blockTerminator: number;
}

export class GifGraphicControlExtension<B> extends GifExtension<B> {
    public blockSize: Uint8BytesMirror<B>;
    public packedFields: GraphicControlBlockPackedFieldsBytesMirror<B>;
    public delayTime: Uint16LEBytesMirror<B>;
    public transparentColorIndex: Uint8BytesMirror<B>;
    public blockTerminator: Uint8BytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    private parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.blockSize = instantiator.instance.uint8BytesMirror(gifBytes.slice(offset, offset + 1));
        this.packedFields = instantiator.instance.graphicControlBlockPackedFieldsBytesMirror(
            gifBytes.slice(offset + 1, offset + 2)
        );
        this.delayTime = instantiator.instance.uint16LEBytesMirror(gifBytes.slice(offset + 2, offset + 4));
        this.transparentColorIndex = instantiator.instance.uint8BytesMirror(gifBytes.slice(offset + 4, offset + 5));
        this.blockTerminator = instantiator.instance.uint8BytesMirror(gifBytes.slice(offset + 5, offset + 6));
    }

    get isValid(): boolean {
        return true;
    }

    get size(): number {
        return (
            this.introSize +
            this.blockSize.size +
            this.packedFields.size +
            this.delayTime.size +
            this.transparentColorIndex.size +
            this.blockTerminator.size
        );
    }

    get raw(): GifGraphicControlExtensionRaw<B> {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            blockSize: this.blockSize.bytes,
            packedFields: this.packedFields.bytes,
            delayTime: this.delayTime.bytes,
            transparentColorIndex: this.transparentColorIndex.bytes,
            blockTerminator: this.blockTerminator.bytes
        };
    }

    get value(): GifGraphicControlExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            blockSize: this.blockSize.value,
            packedFields: this.packedFields.value,
            delayTime: this.delayTime.value,
            transparentColorIndex: this.transparentColorIndex.value,
            blockTerminator: this.blockTerminator.value
        };
    }
}
