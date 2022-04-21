import { BytesMirror } from '@blackmirror/bytes-mirror';
import { BytesView } from '@blackmirror/bytes-view';

import { parseDataSubBlocks } from '@/utils/parsing';

export abstract class StringSubBlocksBytesMirror<B> extends BytesMirror<B, string> {
    protected bytesToValue(bytes: BytesView<B>): string {
        return parseDataSubBlocks(bytes, 0, (subBlock: BytesView<B>) => subBlock.toString()).join('');
    }
    protected valueToBytes(value: string): BytesView<B> {
        const nOfFullBlocks = Math.floor(value.length / 255);
        const sizeOfLastBlock = value.length % 255;
        const nOfBlocks = nOfFullBlocks + (sizeOfLastBlock > 0 ? 1 : 0);
        const sizeOfBytes = nOfFullBlocks * 255 + sizeOfLastBlock + nOfBlocks + 1;

        const result = this.bytesView.alloc(sizeOfBytes);

        for (let i = 0; i < nOfFullBlocks; i++) {
            const stringOffset = i * 255;
            const blockOffset = stringOffset + i;
            result.writeUint8(255, blockOffset);
            result.write(value.slice(stringOffset, stringOffset + 255), blockOffset + 1);
        }
        if (sizeOfLastBlock) {
            const stringOffset = nOfFullBlocks * 255;
            const blockOffset = stringOffset + nOfFullBlocks;
            result.writeUint8(sizeOfLastBlock, blockOffset);
            result.write(value.slice(stringOffset, stringOffset + sizeOfLastBlock), blockOffset + 1);
        }
        result.writeUint8(0, sizeOfBytes - 1);

        return result;
    }
}
