import { parseDataSubBlocks } from '../parsing';
import { BufferMirror } from '.';

export class StringSubBlocksBufferMirror extends BufferMirror<string> {
    protected bytesToValue(bytes: Buffer): string {
        return parseDataSubBlocks(bytes, 0, (subBlock: Buffer) => subBlock.toString()).join('');
    }
    protected valueToBytes(value: string): Buffer {
        const nOfFullBlocks = Math.floor(value.length / 255);
        const sizeOfLastBlock = value.length % 255;
        const nOfBlocks = nOfFullBlocks + (sizeOfLastBlock > 0 ? 1 : 0);
        const sizeOfBuffer = nOfFullBlocks * 255 + sizeOfLastBlock + nOfBlocks + 1;

        const result = Buffer.alloc(sizeOfBuffer);

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
        result.writeUint8(0, sizeOfBuffer - 1);

        return result;
    }
}
