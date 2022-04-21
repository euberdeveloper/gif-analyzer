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

export interface GifRfc<B> {
    header: GifHeader<B>;
    logicalScreen: GifLogicalScreen<B>;
    data: GifData<B>[];
}

export interface GifLogicalScreen<B> {
    descriptor: GifLogicalScreenDescriptor<B>;
    globalColorTable: GifColor<B>[] | null;
}

export type GifData<B> = GifGraphicBlock<B> | GifSpecialPurposeBlock<B>;
export type GifSpecialPurposeBlock<B> = GifApplicationExtension<B> | GifCommentExtension<B>;

export interface GifGraphicBlock<B> {
    graphicControlExtension: GifGraphicControlExtension<B> | null;
    otherExtensions: GifExtension<B>[];
    graphicRenderingBlock: GifGraphicRenderingBlock<B>;
}

export type GifGraphicRenderingBlock<B> = GifTableBasedImage<B> | GifPlainTextExtension<B>;

export interface GifTableBasedImage<B> {
    descriptor: GifImageDescriptor<B>;
    localColorTable: GifColor<B>[] | null;
    data: GifTableBasedImageData<B>;
}
