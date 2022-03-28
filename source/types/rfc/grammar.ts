import {
    GifApplicationExtension,
    GifColorTable,
    GifCommentExtension,
    GifExtension,
    GifGraphicControlExtension,
    GifImageData,
    GifImageDescriptor,
    GifLogicalScreenDescriptor,
    GifPlainTextExtension
} from './definitions';

export interface GifDataStream {
    header: GifHeader;
    logicalScreen: GifLogicalScreen;
    data: GifData[];
}

export interface GifHeader {
    signature: string;
    version: string;
}

export interface GifLogicalScreen {
    logicalScreenDescriptor: GifLogicalScreenDescriptor;
    globalColorTable: GifColorTable | null;
}

export type GifData = GifGraphicBlock | GifSpecialPurposeBlock;

export interface GifGraphicBlock {
    graphicControlExtension: GifGraphicControlExtension | null;
    otherExtensions: GifExtension[];
    graphicRenderingBlock: GifGraphicRenderingBlock;
}

export type GifGraphicRenderingBlock = GifTableBasedImage | GifPlainTextExtension;

export interface GifTableBasedImage {
    imageDescriptor: GifImageDescriptor;
    localColorTable: GifColorTable | null;
    imageData: GifImageData;
}

export type GifSpecialPurposeBlock = GifApplicationExtension | GifCommentExtension;
