import { BytesView, Uint8BytesMirror, StringBytesMirror, Uint16LEBytesMirror } from '@blackmirror/bytes-mirror';
import { StringSubBlocksBytesMirror, GraphicControlBlockPackedFieldsBytesMirror } from '@/utils/mirrors';

export abstract class Instantiator {
    public abstract uint8BytesMirror<B>(bytes: BytesView<B>): Uint8BytesMirror<B>;
    public abstract uint16LEBytesMirror<B>(bytes: BytesView<B>): Uint16LEBytesMirror<B>;
    public abstract stringBytesMirror<B>(bytes: BytesView<B>): StringBytesMirror<B>;

    public abstract stringSubBlocksBytesMirror<B>(bytes: BytesView<B>): StringSubBlocksBytesMirror<B>;
    public abstract graphicControlBlockPackedFieldsBytesMirror<B>(
        bytes: BytesView<B>
    ): GraphicControlBlockPackedFieldsBytesMirror<B>;
}

const instantiator: { instance: Instantiator } = {
    instance: null as any
};
export default instantiator;

export function initialize(generator: () => Instantiator): void {
    instantiator.instance = generator();
}
