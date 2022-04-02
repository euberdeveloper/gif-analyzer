import { BufferMirror } from '.';

export class Uint16LEBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return bytes.readUint16LE();
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([value & 0xff, (value >> 8) & 0xff]);
    }
}
