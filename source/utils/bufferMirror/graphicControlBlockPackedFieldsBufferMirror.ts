import { readBits, writeBits } from '@/utils/bitsHandling';
import { BufferMirror } from '.';

export interface GraphicControlBlockPackedFields {
    reserved: number;
    disposalMethod: number;
    userInputFlag: boolean;
    transparentColorFlag: boolean;
}

export class GraphicControlBlockPackedFieldsBufferMirror extends BufferMirror<GraphicControlBlockPackedFields> {
    protected bytesToValue(bytes: Buffer): GraphicControlBlockPackedFields {
        const byte = bytes.readUint8();
        return {
            reserved: readBits(byte, 0, 3),
            disposalMethod: readBits(byte, 3, 6),
            userInputFlag: readBits(byte, 6, 7) === 1,
            transparentColorFlag: readBits(byte, 7, 8) === 1
        };
    }
    protected valueToBytes(value: GraphicControlBlockPackedFields): Buffer {
        let byte = 0xff;
        byte = writeBits(byte, value.reserved, 0, 3);
        byte = writeBits(byte, value.disposalMethod, 3, 6);
        byte = writeBits(byte, value.userInputFlag ? 1 : 0, 6, 7);
        byte = writeBits(byte, value.transparentColorFlag ? 1 : 0, 7, 8);
        return Buffer.from([byte]);
    }
}
