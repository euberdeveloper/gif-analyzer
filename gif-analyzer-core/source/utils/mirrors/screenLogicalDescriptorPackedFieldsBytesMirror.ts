import { BytesMirror } from '@blackmirror/bytes-mirror';
import { BytesView } from '@blackmirror/bytes-view';

import { readBits, writeBits } from '@/utils/bitsHandling';
export interface LogicalDescriptorPackedFields {
    globalColorTableFlag: boolean;
    colorResolution: number;
    sortFlag: boolean;
    globalColorTableSize: number;
}

export abstract class ScreenLogicalDescriptorPackedFieldsBytesMirror<B> extends BytesMirror<
    B,
    LogicalDescriptorPackedFields
> {
    protected bytesToValue(bytesView: BytesView<B>): LogicalDescriptorPackedFields {
        const byte = bytesView.readUint8();
        return {
            globalColorTableFlag: readBits(byte, 0, 1) === 1,
            colorResolution: readBits(byte, 1, 4),
            sortFlag: readBits(byte, 4, 5) === 1,
            globalColorTableSize: readBits(byte, 5, 8)
        };
    }
    protected valueToBytes(value: LogicalDescriptorPackedFields): BytesView<B> {
        let byte = 0xff;
        byte = writeBits(byte, 0, 1, value.globalColorTableFlag ? 1 : 0);
        byte = writeBits(byte, 1, 4, value.colorResolution);
        byte = writeBits(byte, 4, 5, value.sortFlag ? 1 : 0);
        byte = writeBits(byte, 5, 8, value.globalColorTableSize);
        return this.bytesView.from([byte]);
    }
}
