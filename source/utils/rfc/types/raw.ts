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

export interface GifRfcRaw {
    header: GifHeaderRaw;
    logicalScreen: GifLogicalScreenRaw;
    data: GifDataRaw[];
}

export interface GifLogicalScreenRaw {
    descriptor: GifLogicalScreenDescriptorRaw;
    globalColorTable: GifColorRaw[] | null;
}

export type GifDataRaw = GifGraphicBlockRaw | GifSpecialPurposeBlockRaw;
export type GifSpecialPurposeBlockRaw = GifApplicationExtensionRaw | GifCommentExtensionRaw;

export interface GifGraphicBlockRaw {
    graphicControlExtension: GifGraphicControlExtensionRaw | null;
    otherExtensions: GifExtensionRaw[];
    graphicRenderingBlock: GifGraphicRenderingBlockRaw;
}

export type GifGraphicRenderingBlockRaw = GifTableBasedImageRaw | GifPlainTextExtensionRaw;

export interface GifTableBasedImageRaw {
    descriptor: GifImageDescriptorRaw;
    localColorTable: GifColorRaw[] | null;
    data: GifTableBasedImageDataRaw;
}
