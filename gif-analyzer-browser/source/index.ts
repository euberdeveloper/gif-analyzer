import { BytesView } from '@blackmirror/bytes-mirror';
import { ArrayBufferView } from '@blackmirror/array-buffer-view';
import {
    GifAnalyzer as GifAnalyzerCore,
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
    GifApplicationExtensionArrayBuffer,
    GifColorArrayBuffer,
    GifCommentExtensionArrayBuffer,
    GifGraphicControlExtensionArrayBuffer,
    GifHeaderArrayBuffer,
    GifImageDescriptorArrayBuffer,
    GifLogicalScreenDescriptorArrayBuffer,
    GifPlainTextExtensionArrayBuffer,
    GifTableBasedImageDataArrayBuffer
} from './utils';

export class GifAnalyzer extends GifAnalyzerCore<ArrayBuffer> {
    protected bytesToBytesView(bytes: ArrayBuffer): BytesView<ArrayBuffer> {
        return new ArrayBufferView(bytes);
    }
    protected instantiateHeader(bytes: BytesView<ArrayBuffer>, cursor: number): GifHeader<ArrayBuffer> {
        return new GifHeaderArrayBuffer(bytes, cursor);
    }
    protected instantiateLogicalScreenDescriptor(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifLogicalScreenDescriptor<ArrayBuffer> {
        return new GifLogicalScreenDescriptorArrayBuffer(bytes, cursor);
    }
    protected instantiateColor(bytes: BytesView<ArrayBuffer>, cursor: number): GifColor<ArrayBuffer> {
        return new GifColorArrayBuffer(bytes, cursor);
    }
    protected instantiateGraphicControlExtension(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifGraphicControlExtension<ArrayBuffer> {
        return new GifGraphicControlExtensionArrayBuffer(bytes, cursor);
    }
    protected instantiateImageDescriptor(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifImageDescriptor<ArrayBuffer> {
        return new GifImageDescriptorArrayBuffer(bytes, cursor);
    }
    protected instantiateTableBasedImageData(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifTableBasedImageData<ArrayBuffer> {
        return new GifTableBasedImageDataArrayBuffer(bytes, cursor);
    }
    protected instantiatePlainTextExtension(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifPlainTextExtension<ArrayBuffer> {
        return new GifPlainTextExtensionArrayBuffer(bytes, cursor);
    }
    protected instantiateApplicationExtension(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifApplicationExtension<ArrayBuffer> {
        return new GifApplicationExtensionArrayBuffer(bytes, cursor);
    }
    protected instantiateCommentExtension(
        bytes: BytesView<ArrayBuffer>,
        cursor: number
    ): GifCommentExtension<ArrayBuffer> {
        return new GifCommentExtensionArrayBuffer(bytes, cursor);
    }
}
