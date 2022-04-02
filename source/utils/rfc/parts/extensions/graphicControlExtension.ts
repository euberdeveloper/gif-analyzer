import {
    ByteBufferMirror,
    Uint16LEBufferMirror,
    LogicalDescriptorPackedFields,
    ScreenLogicalDescriptorPackedFieldsBufferMirror
} from '@/utils/bufferMirror';
import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifGraphicControlExtensionRaw extends GifExtensionRaw {
    blockSize: Buffer;
    packedFields: Buffer;
    delayTime: Buffer;
    transparentColorIndex: Buffer;
}

export interface GifGraphicControlExtensionValue extends GifExtensionValue {
    blockSize: number;
    packedFields: LogicalDescriptorPackedFields;
    delayTime: number;
    transparentColorIndex: number;
}

export class GifGraphicControlExtension extends GifExtension {
    public blockSize: ByteBufferMirror;
    public packedFields: ScreenLogicalDescriptorPackedFieldsBufferMirror;
    public delayTime: Uint16LEBufferMirror;
    public transparentColorIndex: ByteBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.blockSize = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));
        this.packedFields = new ScreenLogicalDescriptorPackedFieldsBufferMirror(gifBytes.slice(offset + 1, offset + 2));
        this.delayTime = new Uint16LEBufferMirror(gifBytes.slice(offset + 2, offset + 4));
        this.transparentColorIndex = new ByteBufferMirror(gifBytes.slice(offset + 4, offset + 5));
        this.parseTerminator(gifBytes, offset + 5);
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

    get raw(): GifGraphicControlExtensionRaw {
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
