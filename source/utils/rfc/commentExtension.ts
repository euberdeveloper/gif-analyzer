import { ExtensionLabel } from '@/types';
import { StringSubBlocksBufferMirror } from '@/utils/bufferMirror';
import { getDataSubBlocksSize } from '@/utils/parsing';
import { GifExtension } from './extension';

export interface GifCommentExtensionRaw {
    introducer: Buffer;
    label: Buffer;
    comment: Buffer;
    blockTerminator: Buffer;
}

export interface GifCommentExtensionValue {
    introducer: number;
    label: ExtensionLabel;
    comment: string;
    blockTerminator: string;
}

export class GifCommentExtension extends GifExtension {
    public comment: StringSubBlocksBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: Buffer, offset: number): void {
        const commentSize = getDataSubBlocksSize(gifBytes, offset);
        this.comment = new StringSubBlocksBufferMirror(gifBytes.slice(offset, offset + commentSize));
        this.parseTerminator(gifBytes, offset + commentSize);
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return this.introducer.size + this.label.size + this.blockTerminator.size;
    }

    get raw(): GifCommentExtensionRaw {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            comment: this.comment.bytes,
            blockTerminator: this.blockTerminator.bytes
        };
    }

    get value(): GifCommentExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            comment: this.comment.value,
            blockTerminator: this.blockTerminator.value
        };
    }
}
