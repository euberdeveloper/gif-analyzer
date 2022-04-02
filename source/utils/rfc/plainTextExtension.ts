import { ExtensionLabel } from '@/types';
import { ByteBufferMirror, StringSubBlocksBufferMirror, Uint16LEBufferMirror } from '@/utils/bufferMirror';
import { getDataSubBlocksSize } from '@/utils/parsing';
import { GifExtension } from './extension';

export interface GifPlainTextExtensionRaw {
    introducer: Buffer;
    label: Buffer;
    textGridLeftPosition: Buffer;
    textGridTopPosition: Buffer;
    textGridWidth: Buffer;
    textGridHeight: Buffer;
    characterCellWidth: Buffer;
    characterCellHeight: Buffer;
    textForegroundColor: Buffer;
    textBackgroundColor: Buffer;
    text: Buffer;
    blockTerminator: Buffer;
}

export interface GifPlainTextExtensionValue {
    introducer: number;
    label: number;
    textGridLeftPosition: number;
    textGridTopPosition: number;
    textGridWidth: number;
    textGridHeight: number;
    characterCellWidth: number;
    characterCellHeight: number;
    textForegroundColor: number;
    textBackgroundColor: number;
    text: string;
    blockTerminator: string;
}

export class GifPlainTextExtension extends GifExtension {
    public blockSize: ByteBufferMirror;
    public textGridLeftPosition: Uint16LEBufferMirror;
    public textGridTopPosition: Uint16LEBufferMirror;
    public textGridWidth: Uint16LEBufferMirror;
    public textGridHeight: Uint16LEBufferMirror;
    public characterCellWidth: ByteBufferMirror;
    public characterCellHeight: ByteBufferMirror;
    public textForegroundColor: ByteBufferMirror;
    public textBackgroundColor: ByteBufferMirror;

    public text: StringSubBlocksBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: Buffer, offset: number): void {
        this.blockSize = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));
        this.textGridLeftPosition = new Uint16LEBufferMirror(gifBytes.slice(offset + 1, offset + 3));
        this.textGridTopPosition = new Uint16LEBufferMirror(gifBytes.slice(offset + 3, offset + 5));
        this.textGridWidth = new Uint16LEBufferMirror(gifBytes.slice(offset + 5, offset + 7));
        this.textGridHeight = new Uint16LEBufferMirror(gifBytes.slice(offset + 7, offset + 9));
        this.characterCellWidth = new ByteBufferMirror(gifBytes.slice(offset + 9, offset + 10));
        this.characterCellHeight = new ByteBufferMirror(gifBytes.slice(offset + 10, offset + 11));
        this.textForegroundColor = new ByteBufferMirror(gifBytes.slice(offset + 11, offset + 12));
        this.textBackgroundColor = new ByteBufferMirror(gifBytes.slice(offset + 12, offset + 13));

        const textOffset = offset + 13;
        const textSize = getDataSubBlocksSize(gifBytes, textOffset);
        this.text = new StringSubBlocksBufferMirror(gifBytes.slice(textOffset, textOffset + textSize));
        this.parseTerminator(gifBytes, textOffset + textSize);
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return this.introducer.size + this.label.size + this.blockTerminator.size;
    }

    get raw(): GifPlainTextExtensionRaw {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            textGridLeftPosition: this.textGridLeftPosition.bytes,
            textGridTopPosition: this.textGridTopPosition.bytes,
            textGridWidth: this.textGridWidth.bytes,
            textGridHeight: this.textGridHeight.bytes,
            characterCellWidth: this.characterCellWidth.bytes,
            characterCellHeight: this.characterCellHeight.bytes,
            textForegroundColor: this.textForegroundColor.bytes,
            textBackgroundColor: this.textBackgroundColor.bytes,
            text: this.text.bytes,
            blockTerminator: this.blockTerminator.bytes
        };
    }

    get value(): GifPlainTextExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            textGridLeftPosition: this.textGridLeftPosition.value,
            textGridTopPosition: this.textGridTopPosition.value,
            textGridWidth: this.textGridWidth.value,
            textGridHeight: this.textGridHeight.value,
            characterCellWidth: this.characterCellWidth.value,
            characterCellHeight: this.characterCellHeight.value,
            textForegroundColor: this.textForegroundColor.value,
            textBackgroundColor: this.textBackgroundColor.value,
            text: this.text.value,
            blockTerminator: this.blockTerminator.value
        };
    }
}
