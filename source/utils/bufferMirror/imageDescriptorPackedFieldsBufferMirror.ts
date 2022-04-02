import { readBits, writeBits } from '@/utils/bitsHandling';
import { BufferMirror } from '.';

export interface ImageDescriptorPackedFields {
    localColorTableFlag: boolean;
    interlaceFlag: boolean;
    sortFlag: boolean;
    reserved: number;
    localColorTableSize: number;
}

export class ImageDescriptorPackedFieldsBufferMirror extends BufferMirror<ImageDescriptorPackedFields> {
    protected bytesToValue(bytes: Buffer): ImageDescriptorPackedFields {
        const byte = bytes.readUint8();
        return {
            localColorTableFlag: readBits(byte, 0, 1) === 1,
            interlaceFlag: readBits(byte, 1, 2) === 1,
            sortFlag: readBits(byte, 2, 3) === 1,
            reserved: readBits(byte, 3, 5),
            localColorTableSize: readBits(byte, 5, 8)
        };
    }
    protected valueToBytes(value: ImageDescriptorPackedFields): Buffer {
        let byte = 0xff;
        byte = writeBits(byte, value.localColorTableFlag ? 1 : 0, 0, 1);
        byte = writeBits(byte, value.interlaceFlag ? 1 : 0, 1, 2);
        byte = writeBits(byte, value.sortFlag ? 1 : 0, 2, 3);
        byte = writeBits(byte, value.reserved, 3, 5);
        return Buffer.from([byte]);
    }
}
