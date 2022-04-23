import { BytesView } from '@blackmirror/bytes-mirror';
import { BufferView } from '@blackmirror/buffer-view';
import {
    GifAnalyzerCore,
    GifApplicationExtension,
    GifColor,
    GifCommentExtension,
    GifGraphicControlExtension,
    GifHeader,
    GifImageDescriptor,
    GifLogicalScreenDescriptor,
    GifPlainTextExtension,
    GifTableBasedImageData
} from 'gif-analyzer-core';

import {
    GifApplicationExtensionBuffer,
    GifColorBuffer,
    GifCommentExtensionBuffer,
    GifGraphicControlExtensionBuffer,
    GifHeaderBuffer,
    GifImageDescriptorBuffer,
    GifLogicalScreenDescriptorBuffer,
    GifPlainTextExtensionBuffer,
    GifTableBasedImageDataBuffer
} from './utils';

export * from 'gif-analyzer-core';

export class GifAnalyzer extends GifAnalyzerCore<Buffer> {
    protected bytesToBytesView(bytes: Buffer): BytesView<Buffer> {
        return new BufferView(bytes);
    }
    protected instantiateHeader(bytes: BytesView<Buffer>, cursor: number): GifHeader<Buffer> {
        return new GifHeaderBuffer(bytes, cursor);
    }
    protected instantiateLogicalScreenDescriptor(
        bytes: BytesView<Buffer>,
        cursor: number
    ): GifLogicalScreenDescriptor<Buffer> {
        return new GifLogicalScreenDescriptorBuffer(bytes, cursor);
    }
    protected instantiateColor(bytes: BytesView<Buffer>, cursor: number): GifColor<Buffer> {
        return new GifColorBuffer(bytes, cursor);
    }
    protected instantiateGraphicControlExtension(
        bytes: BytesView<Buffer>,
        cursor: number
    ): GifGraphicControlExtension<Buffer> {
        return new GifGraphicControlExtensionBuffer(bytes, cursor);
    }
    protected instantiateImageDescriptor(bytes: BytesView<Buffer>, cursor: number): GifImageDescriptor<Buffer> {
        return new GifImageDescriptorBuffer(bytes, cursor);
    }
    protected instantiateTableBasedImageData(bytes: BytesView<Buffer>, cursor: number): GifTableBasedImageData<Buffer> {
        return new GifTableBasedImageDataBuffer(bytes, cursor);
    }
    protected instantiatePlainTextExtension(bytes: BytesView<Buffer>, cursor: number): GifPlainTextExtension<Buffer> {
        return new GifPlainTextExtensionBuffer(bytes, cursor);
    }
    protected instantiateApplicationExtension(
        bytes: BytesView<Buffer>,
        cursor: number
    ): GifApplicationExtension<Buffer> {
        return new GifApplicationExtensionBuffer(bytes, cursor);
    }
    protected instantiateCommentExtension(bytes: BytesView<Buffer>, cursor: number): GifCommentExtension<Buffer> {
        return new GifCommentExtensionBuffer(bytes, cursor);
    }
}
