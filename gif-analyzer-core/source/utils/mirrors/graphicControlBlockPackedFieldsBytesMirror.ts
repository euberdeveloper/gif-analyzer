import { BytesMirror } from '@blackmirror/bytes-mirror';
import { BytesView } from '@blackmirror/bytes-view';

import { readBits, writeBits } from '@/utils/bitsHandling';

export interface GraphicControlBlockPackedFields {
    reserved: number;
    disposalMethod: number;
    userInputFlag: boolean;
    transparentColorFlag: boolean;
}

export abstract class GraphicControlBlockPackedFieldsBytesMirror<B> extends BytesMirror<
    B,
    GraphicControlBlockPackedFields
> {
    protected bytesToValue(bytesView: BytesView<B>): GraphicControlBlockPackedFields {
        const byte = bytesView.readUint8();
        return {
            reserved: readBits(byte, 0, 3),
            disposalMethod: readBits(byte, 3, 6),
            userInputFlag: readBits(byte, 6, 7) === 1,
            transparentColorFlag: readBits(byte, 7, 8) === 1
        };
    }
    protected valueToBytes(value: GraphicControlBlockPackedFields): BytesView<B> {
        let byte = 0xff;
        byte = writeBits(byte, value.reserved, 0, 3);
        byte = writeBits(byte, value.disposalMethod, 3, 6);
        byte = writeBits(byte, value.userInputFlag ? 1 : 0, 6, 7);
        byte = writeBits(byte, value.transparentColorFlag ? 1 : 0, 7, 8);
        return this.bytesView.from([byte]);
    }
}
