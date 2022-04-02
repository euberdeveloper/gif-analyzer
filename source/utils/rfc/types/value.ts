import {
    GifHeaderValue,
    GifLogicalScreenDescriptorValue,
    GifColorValue,
    GifApplicationExtensionValue,
    GifCommentExtensionValue,
    GifGraphicControlExtensionValue,
    GifExtensionValue,
    GifPlainTextExtensionValue,
    GifImageDescriptorValue,
    GifTableBasedImageDataValue
} from '../parts';

export interface GifRfcValue {
    header: GifHeaderValue;
    logicalScreen: GifLogicalScreenValue;
    data: GifDataValue[];
}

export interface GifLogicalScreenValue {
    descriptor: GifLogicalScreenDescriptorValue;
    globalColorTable: GifColorValue[] | null;
}

export type GifDataValue = GifGraphicBlockValue | GifSpecialPurposeBlockValue;
export type GifSpecialPurposeBlockValue = GifApplicationExtensionValue | GifCommentExtensionValue;

export interface GifGraphicBlockValue {
    graphicControlExtensionValue: GifGraphicControlExtensionValue | null;
    otherExtensionValues: GifExtensionValue[];
    graphicRenderingBlockValue: GifGraphicRenderingBlockValue;
}

export type GifGraphicRenderingBlockValue = GifTableBasedImageValue | GifPlainTextExtensionValue;

export interface GifTableBasedImageValue {
    descriptor: GifImageDescriptorValue;
    localColorTable: GifColorValue[] | null;
    data: GifTableBasedImageDataValue;
}
