export * from './byteBufferMirror';
export * from './uint16LEBufferMirror';
export * from './uint16BEBufferMirror';
export * from './uint32LEBufferMirror';
export * from './uint32BEBufferMirror';
export * from './uint64LEBufferMirror';
export * from './uint64BEBufferMirror';

export abstract class BufferMirror<T> {
    private _bytes: Buffer;

    constructor(bytes: Buffer) {
        this._bytes = bytes;
    }

    get bytes(): Buffer {
        return this._bytes;
    }
    set bytes(bytes: Buffer) {
        this._bytes = bytes;
    }

    get value(): T {
        return this.bytesToValue(this._bytes);
    }
    set value(value: T) {
        this._bytes = this.valueToBytes(value);
    }

    protected abstract bytesToValue(bytes: Buffer): T;
    protected abstract valueToBytes(value: T): Buffer;
}
