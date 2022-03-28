export interface GifDataStream {
    header: GifHeader;
    logicalScreen: GifLogicalScreen;
    data: GifData[];
    trailer: GifTrailer;
}
export type GifTrailer = {};

export interface GifHeader {
    signature: string;
    version: string;
}

export interface GifLogicalScreen {
    logicalScreenDescriptor: GifLogicalScreenDescriptor;
    globalColorTable: GifColorTable | null;
}

export interface GifLogicalScreenDescriptor {
    width: number;
    height: number;
    packedFields: {
        globalColorTableFlag: boolean;
        colorResolution: number;
        sortFlag: boolean;
        globalColorTableSize: number;
    };
    backgroundColorIndex: number;
    pixelAspectRatio: number;
}

export interface GifColor {
    red: number;
    green: number;
    blue: number;
}
export type GifColorTable = GifColor[];

export type GifData = GifGraphicBlock | GifSpecialPurposeBlock;

export interface GifGraphicBlock {
    graphicControlExtension: GifGraphicControlExtension | null;
    graphicRenderingBlock: GifGraphicRenderingBlock;
}

export type GifGraphicControlExtension = {};

export type GifGraphicRenderingBlock = GifTableBasedImage | GifPlainTextExtension;

export interface GifTableBasedImage {
    imageDescriptor: GifImageDescriptor;
    localColorTable: GifColorTable | null;
    imageData: GifImageData;
}

export type GifImageData = {};
export type GifPlainTextExtension = {};

export type GifSpecialPurposeBlock = GifApplicationExtension | GifCommentExtension;

export type GifApplicationExtension = {};
export type GifCommentExtension = {};

export interface GifImageDescriptor {
    leftPosition: number;
    topPosition: number;
    width: number;
    height: number;
    packedFields: {
        localColorTableFlag: boolean;
        interlaceFlag: boolean;
        sortFlag: boolean;
        localColorTableSize: number;
    };
}
