import { BufferMirror } from '.';

export class Uint32BEBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return bytes.readUint32BE();
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([(value >> 24) & 0xff, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff]);
    }
}
