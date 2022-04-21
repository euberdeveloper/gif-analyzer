
export interface GifColorRaw {
    red: Buffer;
    green: Buffer;
    blue: Buffer;
}

export interface GifColorValue {
    red: number;
    green: number;
    blue: number;
}

export abstract class GifColor<B> {
    public red: ByteBufferMirror;
    public green: ByteBufferMirror;
    public blue: ByteBufferMirror;

    constructor(gifBytes: Buffer, offset: number) {
        this.parseBytes(gifBytes, offset);
    }

    private parseBytes(gifBytes: Buffer, offset: number): void {
        this.red = new ByteBufferMirror(gifBytes.slice(offset, offset + 1));
        this.green = new ByteBufferMirror(gifBytes.slice(offset + 1, offset + 2));
        this.blue = new ByteBufferMirror(gifBytes.slice(offset + 2, offset + 3));
    }

    get isValid(): boolean {
        return true;
    }

    get size(): number {
        return this.red.size + this.green.size + this.blue.size;
    }

    get raw(): GifColorRaw {
        return {
            red: this.red.bytes,
            green: this.green.bytes,
            blue: this.blue.bytes
        };
    }

    get value(): GifColorValue {
        return {
            red: this.red.value,
            green: this.green.value,
            blue: this.blue.value
        };
    }
}
