import { ExtensionLabel } from '@/types';
import { StringSubBlocksBufferMirror } from '@/utils/bufferMirror';
import { getDataSubBlocksSize } from '@/utils/parsing';
import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifCommentExtensionRaw extends GifExtensionRaw {
    comment: Buffer;
}

export interface GifCommentExtensionValue extends GifExtensionValue {
    comment: string;
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
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return this.introducer.size + this.comment.size;
    }

    get raw(): GifCommentExtensionRaw {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            comment: this.comment.bytes
        };
    }

    get value(): GifCommentExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            comment: this.comment.value
        };
    }
}
