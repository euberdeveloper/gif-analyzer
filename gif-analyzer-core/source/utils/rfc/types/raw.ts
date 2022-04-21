import {
    GifApplicationExtensionRaw,
    GifColorRaw,
    GifCommentExtensionRaw,
    GifExtensionRaw,
    GifGraphicControlExtensionRaw,
    GifHeaderRaw,
    GifImageDescriptorRaw,
    GifLogicalScreenDescriptorRaw,
    GifPlainTextExtensionRaw,
    GifTableBasedImageDataRaw
} from '../parts';

export interface GifRfcRaw<B> {
    header: GifHeaderRaw<B>;
    logicalScreen: GifLogicalScreenRaw<B>;
    data: GifDataRaw<B>[];
}

export interface GifLogicalScreenRaw<B> {
    descriptor: GifLogicalScreenDescriptorRaw<B>;
    globalColorTable: GifColorRaw<B>[] | null;
}

export type GifDataRaw<B> = GifGraphicBlockRaw<B> | GifSpecialPurposeBlockRaw<B>;
export type GifSpecialPurposeBlockRaw<B> = GifApplicationExtensionRaw<B> | GifCommentExtensionRaw<B>;

export interface GifGraphicBlockRaw<B> {
    graphicControlExtension: GifGraphicControlExtensionRaw<B> | null;
    otherExtensions: GifExtensionRaw<B>[];
    graphicRenderingBlock: GifGraphicRenderingBlockRaw<B>;
}

export type GifGraphicRenderingBlockRaw<B> = GifTableBasedImageRaw<B> | GifPlainTextExtensionRaw<B>;

export interface GifTableBasedImageRaw<B> {
    descriptor: GifImageDescriptorRaw<B>;
    localColorTable: GifColorRaw<B>[] | null;
    data: GifTableBasedImageDataRaw<B>;
}
