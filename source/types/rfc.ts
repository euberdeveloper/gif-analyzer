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

export interface GifExtension {
    extensionIntroducer: number;
    extensionLabel: number;
    blockTerminator: number;
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

export interface GifGraphicControlExtension extends GifExtension {
    blockSize: number;
    packedFields: {
        reserved: number;
        disposalMethod: number;
        userInputFlag: boolean;
        transparentColorFlag: boolean;
    };
    delayTime: number;
    transparentColorIndex: number;
}

export type GifGraphicRenderingBlock = GifTableBasedImage | GifPlainTextExtension;

export interface GifTableBasedImage {
    imageDescriptor: GifImageDescriptor;
    localColorTable: GifColorTable | null;
    imageData: GifImageData;
}

export type GifImageData = number[];
export interface GifPlainTextExtension extends GifExtension {
    blockSize: number;
    textGridLeftPosition: number;
    textGridTopPosition: number;
    textGridWidth: number;
    textGridHeight: number;
    characterCellWidth: number;
    characterCellHeight: number;
    textForegroundColorIndex: number;
    textBackgroundColorIndex: number;
    text: string;
}

export type GifSpecialPurposeBlock = GifApplicationExtension | GifCommentExtension;

export interface GifApplicationExtension extends GifExtension {
    blockSize: number;
    applicationIdentifier: string;
    applicationAuthenticationCode: number[];
    data: number[];
}

export interface GifCommentExtension extends GifExtension {
    text: string;
}

export interface GifImageDescriptor {
    leftPosition: number;
    topPosition: number;
    width: number;
    height: number;
    packedFields: {
        localColorTableFlag: boolean;
        interlaceFlag: boolean;
        sortFlag: boolean;
        reserved: number;
        localColorTableSize: number;
    };
}
