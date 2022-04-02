import { BufferMirror } from '.';

export class BooleanBufferMirror extends BufferMirror<boolean> {
    protected bytesToValue(bytes: Buffer): boolean {
        return bytes[0] !== 0;
    }
    protected valueToBytes(value: boolean): Buffer {
        return Buffer.from([value ? 1 : 0]);
    }
}
