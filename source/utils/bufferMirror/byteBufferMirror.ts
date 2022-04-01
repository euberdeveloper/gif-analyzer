import { BufferMirror } from '.';

export class ByteBufferMirror extends BufferMirror<number> {
    protected bytesToValue(bytes: Buffer): number {
        return bytes.readUint8();
    }
    protected valueToBytes(value: number): Buffer {
        return Buffer.from([value]);
    }
}
