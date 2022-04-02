import { readBits, writeBits } from '@/utils/bitsHandling';
import { BufferMirror } from '.';

export interface LogicalDescriptorPackedFields {
    globalColorTableFlag: boolean;
    colorResolution: number;
    sortFlag: boolean;
    globalColorTableSize: number;
}

export class ScreenLogicalDescriptorPackedFieldsBufferMirror extends BufferMirror<LogicalDescriptorPackedFields> {
    protected bytesToValue(bytes: Buffer): LogicalDescriptorPackedFields {
        const byte = bytes.readUint8();
        return {
            globalColorTableFlag: readBits(byte, 0, 1) === 1,
            colorResolution: readBits(byte, 1, 4),
            sortFlag: readBits(byte, 4, 5) === 1,
            globalColorTableSize: readBits(byte, 5, 8)
        };
    }
    protected valueToBytes(value: LogicalDescriptorPackedFields): Buffer {
        let byte = 0xff;
        byte = writeBits(byte, 0, 1, value.globalColorTableFlag ? 1 : 0);
        byte = writeBits(byte, 1, 4, value.colorResolution);
        byte = writeBits(byte, 4, 5, value.sortFlag ? 1 : 0);
        byte = writeBits(byte, 5, 8, value.globalColorTableSize);
        return Buffer.from([byte]);
    }
}
