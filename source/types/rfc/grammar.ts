import {
    GifApplicationExtension,
    GifColorTable,
    GifCommentExtension,
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
    trailer: GifTrailer;
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
    graphicRenderingBlock: GifGraphicRenderingBlock;
}

export type GifGraphicRenderingBlock = GifTableBasedImage | GifPlainTextExtension | GifApplicationExtension;

export interface GifTableBasedImage {
    imageDescriptor: GifImageDescriptor;
    localColorTable: GifColorTable | null;
    imageData: GifImageData;
}

export type GifSpecialPurposeBlock = GifApplicationExtension | GifCommentExtension;

export type GifTrailer = number;
