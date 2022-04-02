import { BufferMirror } from '.';

export class Uint16BEBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return bytes.readUint16BE();
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([(value >> 8) & 0xff, value & 0xff]);
    }
}
