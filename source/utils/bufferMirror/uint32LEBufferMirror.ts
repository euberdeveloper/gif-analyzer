import { BufferMirror } from '.';

export class Uint32LEBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return bytes.readUint32LE();
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff]);
    }
}
