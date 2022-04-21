import { BytesView, StringBytesMirror, Uint8BytesMirror } from '@blackmirror/bytes-mirror';

import { ExtensionLabel } from '@/types';

import { StringSubBlocksBytesMirror } from '@/utils/mirrors';
import { getDataSubBlocksSize } from '@/utils/parsing';
import instantiator from '@/utils/instantiator';

import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifApplicationExtensionRaw<B> extends GifExtensionRaw<B> {
    blockSize: B;
    applicationIdentifier: B;
    applicationAuthenticationCode: B;
    applicationData: B;
}

export interface GifApplicationExtensionValue extends GifExtensionValue {
    blockSize: number;
    applicationIdentifier: string;
    applicationAuthenticationCode: string;
    applicationData: string;
}

export class GifApplicationExtension<B> extends GifExtension<B> {
    public blockSize: Uint8BytesMirror<B>;
    public applicationIdentifier: StringBytesMirror<B>;
    public applicationAuthenticationCode: StringBytesMirror<B>;

    public applicationData: StringSubBlocksBytesMirror<B>;

    constructor(gifBytes: BytesView<B>, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: BytesView<B>, offset: number): void {
        this.blockSize = instantiator.instance.uint8BytesMirror(gifBytes.slice(offset, offset + 1));
        this.applicationIdentifier = instantiator.instance.stringBytesMirror(gifBytes.slice(offset + 1, offset + 9));
        this.applicationAuthenticationCode = instantiator.instance.stringBytesMirror(
            gifBytes.slice(offset + 9, offset + 12)
        );

        const dataOffset = offset + 12;
        const dataSize = getDataSubBlocksSize(gifBytes, dataOffset);
        this.applicationData = instantiator.instance.stringSubBlocksBytesMirror(
            gifBytes.slice(dataOffset, dataOffset + dataSize)
        );
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return (
            this.introSize +
            this.blockSize.size +
            this.applicationIdentifier.size +
            this.applicationAuthenticationCode.size +
            this.applicationData.size
        );
    }

    get raw(): GifApplicationExtensionRaw<B> {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            blockSize: this.blockSize.bytes,
            applicationIdentifier: this.applicationIdentifier.bytes,
            applicationAuthenticationCode: this.applicationAuthenticationCode.bytes,
            applicationData: this.applicationData.bytes
        };
    }

    get value(): GifApplicationExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            blockSize: this.blockSize.value,
            applicationIdentifier: this.applicationIdentifier.value,
            applicationAuthenticationCode: this.applicationAuthenticationCode.value,
            applicationData: this.applicationData.value
        };
    }
}
