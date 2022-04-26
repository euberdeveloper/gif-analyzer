import { BytesMirror } from '@blackmirror/bytes-mirror';
import { BytesView } from '@blackmirror/bytes-view';

import { readBits, writeBits } from '@/utils/bitsHandling';

export interface ImageDescriptorPackedFields {
    localColorTableFlag: boolean;
    interlaceFlag: boolean;
    sortFlag: boolean;
    reserved: number;
    localColorTableSize: number;
}

export abstract class ImageDescriptorPackedFieldsBytesMirror<B> extends BytesMirror<B, ImageDescriptorPackedFields> {
    protected bytesToValue(bytesView: BytesView<B>): ImageDescriptorPackedFields {
        const byte = bytesView.readUint8();
        return {
            localColorTableFlag: readBits(byte, 0, 1) === 1,
            interlaceFlag: readBits(byte, 1, 2) === 1,
            sortFlag: readBits(byte, 2, 3) === 1,
            reserved: readBits(byte, 3, 5),
            localColorTableSize: readBits(byte, 5, 8)
        };
    }
    protected valueToBytes(value: ImageDescriptorPackedFields): BytesView<B> {
        let byte = 0xff;
        byte = writeBits(byte, 0, 1, value.localColorTableFlag ? 1 : 0);
        byte = writeBits(byte, 1, 2, value.interlaceFlag ? 1 : 0);
        byte = writeBits(byte, 2, 3, value.sortFlag ? 1 : 0);
        byte = writeBits(byte, 3, 5, value.reserved);
        byte = writeBits(byte, 5, 8, value.localColorTableSize);
        return this.bytesView.from([byte]);
    }
}
