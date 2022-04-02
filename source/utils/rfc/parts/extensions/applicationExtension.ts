import { ExtensionLabel } from '@/types';
import { ByteBufferMirror, StringBufferMirror, StringSubBlocksBufferMirror } from '@/utils/bufferMirror';
import { getDataSubBlocksSize } from '@/utils/parsing';
import { GifExtension, GifExtensionRaw, GifExtensionValue } from './extension';

export interface GifApplicationExtensionRaw extends GifExtensionRaw {
    blockSize: Buffer;
    applicationIdentifier: Buffer;
    applicationAuthenticationCode: Buffer;
    applicationData: Buffer;
}

export interface GifApplicationExtensionValue extends GifExtensionValue {
    blockSize: number;
    applicationIdentifier: string;
    applicationAuthenticationCode: string;
    applicationData: string;
}

export class GifApplicationExtension extends GifExtension {
    public blockSize: ByteBufferMirror;
    public applicationIdentifier: StringBufferMirror;
    public applicationAuthenticationCode: StringBufferMirror;

    public applicationData: StringSubBlocksBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        super(gifBytes, offset);
        this.parseBytes(gifBytes, offset + super.introSize);
    }

    protected parseBytes(gifBytes: Buffer, offset: number): void {
        this.blockSize = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));
        this.applicationIdentifier = new StringBufferMirror(gifBytes.slice(offset + 1, offset + 9));
        this.applicationAuthenticationCode = new StringBufferMirror(gifBytes.slice(offset + 9, offset + 12));

        const dataOffset = offset + 12;
        const dataSize = getDataSubBlocksSize(gifBytes, dataOffset);
        this.applicationData = new StringSubBlocksBufferMirror(gifBytes.slice(dataOffset, dataOffset + dataSize));
        this.parseTerminator(gifBytes, dataOffset + dataSize);
    }

    get isValid(): boolean {
        return super.isValid && this.label.value === ExtensionLabel.COMMENT_EXTENSION;
    }

    get size(): number {
        return this.introducer.size + this.label.size + this.blockTerminator.size;
    }

    get raw(): GifApplicationExtensionRaw {
        return {
            introducer: this.introducer.bytes,
            label: this.label.bytes,
            blockSize: this.blockSize.bytes,
            applicationIdentifier: this.applicationIdentifier.bytes,
            applicationAuthenticationCode: this.applicationAuthenticationCode.bytes,
            applicationData: this.applicationData.bytes,
            blockTerminator: this.blockTerminator.bytes
        };
    }

    get value(): GifApplicationExtensionValue {
        return {
            introducer: this.introducer.value,
            label: this.label.value,
            blockSize: this.blockSize.value,
            applicationIdentifier: this.applicationIdentifier.value,
            applicationAuthenticationCode: this.applicationAuthenticationCode.value,
            applicationData: this.applicationData.value,
            blockTerminator: this.blockTerminator.value
        };
    }
}
