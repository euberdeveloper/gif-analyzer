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

    get size(): number {
        return this._bytes.length;
    }

    protected abstract bytesToValue(bytes: Buffer): T;
    protected abstract valueToBytes(value: T): Buffer;
}
