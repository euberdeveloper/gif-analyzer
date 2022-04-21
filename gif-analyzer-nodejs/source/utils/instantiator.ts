import { BytesView, Uint8BytesMirror, Uint16LEBytesMirror, StringBytesMirror } from '@blackmirror/bytes-mirror';
import { BufferView } from '@blackmirror/buffer-view';
import { Uint8BufferMirror, Uint16LEBufferMirror, StringBufferMirror } from '@blackmirror/buffer-mirror';
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

export class StringSubBlocksBufferMirror extends StringSubBlocksBytesMirror<Buffer> {
    protected bytesToBytesView(bytes: Buffer): BytesView<Buffer> {
        return new BufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<Buffer>): string {
        return bytesView.toString();
    }
    protected valueToBytesView(value: string): BytesView<Buffer> {
        return new BufferView(Buffer.from([])).from(value);
    }
}

export class ScreenLogicalDescriptorPackedFieldsBufferMirror extends ScreenLogicalDescriptorPackedFieldsBytesMirror<Buffer> {
    protected bytesViewToValue(bytesView: BytesView<Buffer>): LogicalDescriptorPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: LogicalDescriptorPackedFields): BytesView<Buffer> {
        return this.valueToBytes(value);
    }
    protected bytesToBytesView(bytes: Buffer): BytesView<Buffer> {
        return new BufferView(bytes);
    }
}

export class ImageDescriptorPackedFieldsBufferMirror extends ImageDescriptorPackedFieldsBytesMirror<Buffer> {
    protected bytesToBytesView(bytes: Buffer): BytesView<Buffer> {
        return new BufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<Buffer>): ImageDescriptorPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: ImageDescriptorPackedFields): BytesView<Buffer> {
        return this.valueToBytes(value);
    }
}

export class GraphicControlBlockPackedFieldsBufferMirror extends GraphicControlBlockPackedFieldsBytesMirror<Buffer> {
    protected bytesToBytesView(bytes: Buffer): BytesView<Buffer> {
        return new BufferView(bytes);
    }
    protected bytesViewToValue(bytesView: BytesView<Buffer>): GraphicControlBlockPackedFields {
        return this.bytesToValue(bytesView);
    }
    protected valueToBytesView(value: GraphicControlBlockPackedFields): BytesView<Buffer> {
        return this.valueToBytes(value);
    }
}

export class InstantiatorBuffer extends Instantiator<Buffer> {
    public uint8BytesMirror(bytes: BytesView<Buffer>): Uint8BytesMirror<Buffer> {
        return new Uint8BufferMirror(bytes.buffer);
    }
    public uint16LEBytesMirror(bytes: BytesView<Buffer>): Uint16LEBytesMirror<Buffer> {
        return new Uint16LEBufferMirror(bytes.buffer);
    }
    public stringBytesMirror(bytes: BytesView<Buffer>): StringBytesMirror<Buffer> {
        return new StringBufferMirror(bytes.buffer);
    }
    public stringSubBlocksBytesMirror(bytes: BytesView<Buffer>): StringSubBlocksBytesMirror<Buffer> {
        return new StringSubBlocksBufferMirror(bytes.buffer);
    }
    public graphicControlBlockPackedFieldsBytesMirror(
        bytes: BytesView<Buffer>
    ): GraphicControlBlockPackedFieldsBytesMirror<Buffer> {
        return new GraphicControlBlockPackedFieldsBufferMirror(bytes.buffer);
    }
    public imageDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<Buffer>
    ): ImageDescriptorPackedFieldsBytesMirror<Buffer> {
        return new ImageDescriptorPackedFieldsBufferMirror(bytes.buffer);
    }
    public screenLogicalDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<Buffer>
    ): ScreenLogicalDescriptorPackedFieldsBytesMirror<Buffer> {
        return new ScreenLogicalDescriptorPackedFieldsBufferMirror(bytes.buffer);
    }
}
