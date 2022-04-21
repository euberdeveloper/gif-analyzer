import { BytesView, Uint8BytesMirror, Uint16LEBytesMirror, StringBytesMirror } from '@blackmirror/bytes-mirror';
import { ArrayBufferView } from '@blackmirror/array-buffer-view';
import {
    Uint8ArrayBufferMirror,
    Uint16LEArrayBufferMirror,
    StringArrayBufferMirror
} from '@blackmirror/array-buffer-mirror';
import {
    GraphicControlBlockPackedFields,
    GraphicControlBlockPackedFieldsBytesMirror,
    ImageDescriptorPackedFields,
    ImageDescriptorPackedFieldsBytesMirror,
    Instantiator,
    LogicalDescriptorPackedFields,
    ScreenLogicalDescriptorPackedFieldsBytesMirror,
    StringSubBlocksBytesMirror
} from 'gif-analyzer-core';

export class StringSubBlocksArrayBufferMirror extends StringSubBlocksBytesMirror<ArrayBuffer> {
    protected bytesToBytesView(bytes: ArrayBuffer): BytesView<ArrayBuffer> {
        return new ArrayBufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<ArrayBuffer>): string {
        return bytesView.toString();
    }
    protected valueToBytesView(value: string): BytesView<ArrayBuffer> {
        return new ArrayBufferView(new ArrayBuffer(0)).from(value);
    }
}

export class ScreenLogicalDescriptorPackedFieldsArrayBufferMirror extends ScreenLogicalDescriptorPackedFieldsBytesMirror<ArrayBuffer> {
    protected bytesViewToValue(bytesView: BytesView<ArrayBuffer>): LogicalDescriptorPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: LogicalDescriptorPackedFields): BytesView<ArrayBuffer> {
        return this.valueToBytes(value);
    }
    protected bytesToBytesView(bytes: ArrayBuffer): BytesView<ArrayBuffer> {
        return new ArrayBufferView(bytes);
    }
}

export class ImageDescriptorPackedFieldsArrayBufferMirror extends ImageDescriptorPackedFieldsBytesMirror<ArrayBuffer> {
    protected bytesToBytesView(bytes: ArrayBuffer): BytesView<ArrayBuffer> {
        return new ArrayBufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<ArrayBuffer>): ImageDescriptorPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: ImageDescriptorPackedFields): BytesView<ArrayBuffer> {
        return this.valueToBytes(value);
    }
}

export class GraphicControlBlockPackedFieldsArrayBufferMirror extends GraphicControlBlockPackedFieldsBytesMirror<ArrayBuffer> {
    protected bytesToBytesView(bytes: ArrayBuffer): BytesView<ArrayBuffer> {
        return new ArrayBufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<ArrayBuffer>): GraphicControlBlockPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: GraphicControlBlockPackedFields): BytesView<ArrayBuffer> {
        return this.valueToBytes(value);
    }
}

export class InstantiatorArrayBuffer extends Instantiator<ArrayBuffer> {
    public uint8BytesMirror(bytes: BytesView<ArrayBuffer>): Uint8BytesMirror<ArrayBuffer> {
        return new Uint8ArrayBufferMirror(bytes.buffer);
    }
    public uint16LEBytesMirror(bytes: BytesView<ArrayBuffer>): Uint16LEBytesMirror<ArrayBuffer> {
        return new Uint16LEArrayBufferMirror(bytes.buffer);
    }
    public stringBytesMirror(bytes: BytesView<ArrayBuffer>): StringBytesMirror<ArrayBuffer> {
        return new StringArrayBufferMirror(bytes.buffer);
    }
    public stringSubBlocksBytesMirror(bytes: BytesView<ArrayBuffer>): StringSubBlocksBytesMirror<ArrayBuffer> {
        return new StringSubBlocksArrayBufferMirror(bytes.buffer);
    }
    public graphicControlBlockPackedFieldsBytesMirror(
        bytes: BytesView<ArrayBuffer>
    ): GraphicControlBlockPackedFieldsBytesMirror<ArrayBuffer> {
        return new GraphicControlBlockPackedFieldsArrayBufferMirror(bytes.buffer);
    }
    public imageDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<ArrayBuffer>
    ): ImageDescriptorPackedFieldsBytesMirror<ArrayBuffer> {
        return new ImageDescriptorPackedFieldsArrayBufferMirror(bytes.buffer);
    }
    public screenLogicalDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<ArrayBuffer>
    ): ScreenLogicalDescriptorPackedFieldsBytesMirror<ArrayBuffer> {
        return new ScreenLogicalDescriptorPackedFieldsArrayBufferMirror(bytes.buffer);
    }
}
