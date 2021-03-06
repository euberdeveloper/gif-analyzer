import { BytesView, Uint16LEBytesMirror, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

import { ExtensionLabel } from '@/types';
import { StringSubBlocksBytesMirror } from '@/utils/mirrors';
import { getDataSubBlocksSize } from '@/utils/parsing';

import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifPlainTextExtensionRaw<B> extends GifExtensionRaw<B> {
    blockSize: B;
    textGridLeftPosition: B;
    textGridTopPosition: B;
    textGridWidth: B;
    textGridHeight: B;
    characterCellWidth: B;
    characterCellHeight: B;
    textForegroundColor: B;
    textBackgroundColor: B;
    text: B;
}

export interface GifPlainTextExtensionValue extends GifExtensionValue {
    blockSize: number;
    textGridLeftPosition: number;
    textGridTopPosition: number;
    textGridWidth: number;
    textGridHeight: number;
    characterCellWidth: number;
    characterCellHeight: number;
    textForegroundColor: number;
    textBackgroundColor: number;
    text: string;
}

export abstract class GifPlainTextExtension<B> extends GifExtension<B> {
    public blockSize: Uint8BytesMirror<B>;
    public textGridLeftPosition: Uint16LEBytesMirror<B>;
    public textGridTopPosition: Uint16LEBytesMirror<B>;
    public textGridWidth: Uint16LEBytesMirror<B>;
    public textGridHeight: Uint16LEBytesMirror<B>;
    public characterCellWidth: Uint8BytesMirror<B>;
    public characterCellHeight: Uint8BytesMirror<B>;
    public textForegroundColor: Uint8BytesMirror<B>;
    public textBackgroundColor: Uint8BytesMirror<B>;

    public text: StringSubBlocksBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.blockSize = this.instantiator.uint8BytesMirror(gifBytes.slice(offset, offset + 1));
        this.textGridLeftPosition = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 1, offset + 3));
        this.textGridTopPosition = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 3, offset + 5));
        this.textGridWidth = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 5, offset + 7));
        this.textGridHeight = this.instantiator.uint16LEBytesMirror(gifBytes.slice(offset + 7, offset + 9));
        this.characterCellWidth = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 9, offset + 10));
        this.characterCellHeight = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 10, offset + 11));
        this.textForegroundColor = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 11, offset + 12));
        this.textBackgroundColor = this.instantiator.uint8BytesMirror(gifBytes.slice(offset + 12, offset + 13));

        const textOffset = offset + 13;
        const textSize = getDataSubBlocksSize(gifBytes, textOffset);
        this.text = this.instantiator.stringSubBlocksBytesMirror(gifBytes.slice(textOffset, textOffset + textSize));
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return (
            this.introducer.size +
            this.label.size +
            this.blockSize.size +
            this.textGridLeftPosition.size +
            this.textGridTopPosition.size +
            this.textGridWidth.size +
            this.textGridHeight.size +
            this.characterCellWidth.size +
            this.characterCellHeight.size +
            this.textForegroundColor.size +
            this.textBackgroundColor.size +
            this.text.size
        );
    }

    get raw(): GifPlainTextExtensionRaw<B> {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            blockSize: this.blockSize.bytes,
            textGridLeftPosition: this.textGridLeftPosition.bytes,
            textGridTopPosition: this.textGridTopPosition.bytes,
            textGridWidth: this.textGridWidth.bytes,
            textGridHeight: this.textGridHeight.bytes,
            characterCellWidth: this.characterCellWidth.bytes,
            characterCellHeight: this.characterCellHeight.bytes,
            textForegroundColor: this.textForegroundColor.bytes,
            textBackgroundColor: this.textBackgroundColor.bytes,
            text: this.text.bytes
        };
    }

    get value(): GifPlainTextExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            blockSize: this.blockSize.value,
            textGridLeftPosition: this.textGridLeftPosition.value,
            textGridTopPosition: this.textGridTopPosition.value,
            textGridWidth: this.textGridWidth.value,
            textGridHeight: this.textGridHeight.value,
            characterCellWidth: this.characterCellWidth.value,
            characterCellHeight: this.characterCellHeight.value,
            textForegroundColor: this.textForegroundColor.value,
            textBackgroundColor: this.textBackgroundColor.value,
            text: this.text.value
        };
    }
}
