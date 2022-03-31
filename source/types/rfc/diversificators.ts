import { GifApplicationExtension, GifCommentExtension, GifExtension, GifPlainTextExtension } from './definitions';
import { GifData, GifGraphicBlock, GifGraphicRenderingBlock, GifSpecialPurposeBlock } from './grammar';

export function instanceOfGifGraphicBlock(gifData: GifData): gifData is GifGraphicBlock {
    return (gifData as any).graphicRenderingBlock !== undefined;
}
export function instanceOfGifSpecialPurposeBlock(gifData: GifData): gifData is GifSpecialPurposeBlock {
    return !instanceOfGifGraphicBlock(gifData);
}

export function instanceOfPlainTextExtension(
    obj: GifGraphicRenderingBlock | GifExtension
): obj is GifPlainTextExtension {
    return (obj as any).extensionLabel !== undefined && (obj as any).textGridLeftPosition !== undefined;
}

export function instanceOfApplicationExtension(
    obj: GifSpecialPurposeBlock | GifExtension
): obj is GifApplicationExtension {
    return (obj as any).applicationIdentifier !== undefined;
}

export function instanceOfCommentExtension(obj: GifSpecialPurposeBlock | GifExtension): obj is GifCommentExtension {
    return (obj as any).text !== undefined;
}
