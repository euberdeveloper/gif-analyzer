export enum Version {
    V_87A = '87a',
    V_89A = '89a'
}

export const IMAGE_SEPARATOR = 0x2c;
export const EXTENSION_INTRODUCER = 0x21;

export enum ExtensionLabel {
    GRAPHIC_CONTROL_EXTENSION = 0xf9,
    COMMENT_EXTENSION = 0xfe,
    PLAINTEXT_EXTENSION = 0x01,
    APPLICATION_EXTENSION = 0xff
}
