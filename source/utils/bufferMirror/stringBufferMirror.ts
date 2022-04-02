import { BufferMirror } from '.';

export class StringBufferMirror extends BufferMirror<string> {
    protected bytesToValue(bytes: Buffer): string {
        return bytes.toString();
    }
    protected valueToBytes(value: string): Buffer {
        return Buffer.from(value);
    }
}
