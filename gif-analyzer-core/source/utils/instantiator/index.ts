import { BytesView, Uint8BytesMirror, StringBytesMirror, Uint16LEBytesMirror } from '@blackmirror/bytes-mirror';
import {
    StringSubBlocksBytesMirror,
    GraphicControlBlockPackedFieldsBytesMirror,
    ImageDescriptorPackedFieldsBytesMirror,
    ScreenLogicalDescriptorPackedFieldsBytesMirror
} from '@/utils/mirrors';

export abstract class Instantiator<B> {
    public abstract uint8BytesMirror(bytes: BytesView<B>): Uint8BytesMirror<B>;
    public abstract uint16LEBytesMirror(bytes: BytesView<B>): Uint16LEBytesMirror<B>;
    public abstract stringBytesMirror(bytes: BytesView<B>): StringBytesMirror<B>;

    public abstract stringSubBlocksBytesMirror(bytes: BytesView<B>): StringSubBlocksBytesMirror<B>;
    public abstract graphicControlBlockPackedFieldsBytesMirror(
        bytes: BytesView<B>
    ): GraphicControlBlockPackedFieldsBytesMirror<B>;
    public abstract imageDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<B>
    ): ImageDescriptorPackedFieldsBytesMirror<B>;
    public abstract screenLogicalDescriptorPackedFieldsBytesMirror(
        bytes: BytesView<B>
    ): ScreenLogicalDescriptorPackedFieldsBytesMirror<B>;
}

export abstract class WithInstantiator<B> {
    protected instantiator: Instantiator<B>;

    constructor() {
        this.instantiator = this.initializeInstantiator();
    }

    protected abstract initializeInstantiator(): Instantiator<B>;
}
