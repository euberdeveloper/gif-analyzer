/* COLOURS */

export interface GifColor {
    red: number;
    green: number;
    blue: number;
}
export type GifColorTable = GifColor[];

/* DESCRIPTORS */

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

export type GifImageData = {
    lzwMinimumCodeSize: number;
    data: number[];
};

/* EXTENSIONS */

export interface GifExtension {
    extensionIntroducer: number;
    extensionLabel: number;
    blockTerminator: number;
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

export interface GifApplicationExtension extends GifExtension {
    blockSize: number;
    applicationIdentifier: string;
    applicationAuthenticationCode: number[];
    data: number[];
}

export interface GifCommentExtension extends GifExtension {
    text: string;
}
