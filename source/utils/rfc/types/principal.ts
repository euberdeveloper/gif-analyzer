import {
    GifHeader,
    GifLogicalScreenDescriptor,
    GifColor,
    GifApplicationExtension,
    GifCommentExtension,
    GifGraphicControlExtension,
    GifExtension,
    GifPlainTextExtension,
    GifImageDescriptor,
    GifTableBasedImageData
} from '../parts';

export interface GifRfc {
    header: GifHeader;
    logicalScreen: GifLogicalScreen;
    data: GifData[];
}

export interface GifLogicalScreen {
    descriptor: GifLogicalScreenDescriptor;
    globalColorTable: GifColor[] | null;
}

export type GifData = GifGraphicBlock | GifSpecialPurposeBlock;
export type GifSpecialPurposeBlock = GifApplicationExtension | GifCommentExtension;

export interface GifGraphicBlock {
    graphicControlExtension: GifGraphicControlExtension | null;
    otherExtensions: GifExtension[];
    graphicRenderingBlock: GifGraphicRenderingBlock;
}

export type GifGraphicRenderingBlock = GifTableBasedImage | GifPlainTextExtension;

export interface GifTableBasedImage {
    descriptor: GifImageDescriptor;
    localColorTable: GifColor[] | null;
    data: GifTableBasedImageData;
}
