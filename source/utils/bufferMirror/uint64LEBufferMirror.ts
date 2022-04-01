import { BufferMirror } from '.';

export class Uint64LEBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return Number(bytes.readBigUint64LE());
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([
            value & 0xff,
            (value >> 8) & 0xff,
            (value >> 16) & 0xff,
            (value >> 24) & 0xff,
            (value >> 32) & 0xff,
            (value >> 40) & 0xff,
            (value >> 48) & 0xff,
            (value >> 56) & 0xff
        ]);
    }
}
