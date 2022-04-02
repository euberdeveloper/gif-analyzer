export enum GifVersion {
    V_87A = '87a',
    V_89A = '89a'
}

export const EXTENSION_INTRODUCER = 0x21;
export const TRAILER = 0x3b;

export enum ExtensionLabel {
    GRAPHIC_CONTROL_EXTENSION = 0xf9,
    COMMENT_EXTENSION = 0xfe,
    PLAINTEXT_EXTENSION = 0x01,
    APPLICATION_EXTENSION = 0xff,
    IMAGE_SEPARATOR = 0x2c
}
