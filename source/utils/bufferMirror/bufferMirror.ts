export abstract class BytesView<T> {
    constructor(protected _buffer: T) {}

    get buffer(): T {
        return this._buffer;
    }
    set buffer(value: T) {
        this._buffer = value;
    }

    abstract get length(): number;
}

export class BufferView extends BytesView<Buffer> {
    get length(): number {
        return this._buffer.length;
    }
}

export class ArrayBufferView extends BytesView<ArrayBuffer> {
    get length(): number {
        return this._buffer.byteLength;
    }
}

export abstract class BytesMirror<B, T> {
    private _bytesView: BytesView<B>;

    protected constructor(view: BytesView<B>) {
        this._bytesView = view;
    }

    get bytes(): B {
        return this._bytesView.buffer;
    }
    set bytes(bytes: B) {
        this._bytesView.buffer = bytes;
    }

    get value(): T {
        return this.bytesToValue(this._bytesView);
    }
    set value(value: T) {
        this._bytesView = this.valueToBytes(value);
    }

    protected get size(): number {
        return this._bytesView.length;
    }

    protected abstract bytesToValue(bytes: BytesView<B>): T;
    protected abstract valueToBytes(value: T): BytesView<B>;
}

export abstract class BufferMirror<T> extends BytesMirror<Buffer, T> {
    constructor(buffer: Buffer) {
        super(new BufferView(buffer));
    }
}

export abstract class ArrayBufferMirror<T> extends BytesMirror<ArrayBuffer, T> {
    constructor(buffer: ArrayBuffer) {
        super(new ArrayBufferView(buffer));
    }
}
