import { BytesView } from '@blackmirror/bytes-mirror';

import { ExtensionLabel } from '@/types';

import { StringSubBlocksBytesMirror } from '@/utils/mirrors';
import { getDataSubBlocksSize } from '@/utils/parsing';
import instantiator from '@/utils/instantiator';

import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifCommentExtensionRaw<B> extends GifExtensionRaw<B> {
    comment: B;
}

export interface GifCommentExtensionValue extends GifExtensionValue {
    comment: string;
}

export class GifCommentExtension<B> extends GifExtension<B> {
    public comment: StringSubBlocksBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: BytesView<B>, offset: number): void {
        const commentSize = getDataSubBlocksSize(gifBytes, offset);
        this.comment = instantiator.instance.stringSubBlocksBytesMirror(gifBytes.slice(offset, offset + commentSize));
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return this.introducer.size + this.comment.size;
    }

    get raw(): GifCommentExtensionRaw<B> {
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
