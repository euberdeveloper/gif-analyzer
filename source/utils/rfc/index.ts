import { BufferMirror } from '@/utils/bufferMirror';
import { GifRfc, GifRfcRaw, GifRfcValue } from './types';

export * from './parts';
export * from './types';

function _rfcToRaw(data: any): any {
    if (data === null) {
        return null;
    } else if (data instanceof BufferMirror) {
        return data.bytes;
    } else if (Array.isArray(data)) {
        return data.map(d => _rfcToRaw(d));
    } else if (typeof data === 'object') {
        return Object.entries(data).reduce((acc, [k, v]) => {
            acc[k] = _rfcToRaw(v);
            return acc;
        }, {});
    } else {
        throw new TypeError('RfcToRaw: Unsupported type');
    }
}
export function rfcToRaw(data: GifRfc): GifRfcRaw {
    return _rfcToRaw(data) as GifRfcRaw;
}

function _rfcToValue(data: any): any {
    if (data === null) {
        return null;
    } else if (data instanceof BufferMirror) {
        return data.value;
    } else if (Array.isArray(data)) {
        return data.map(d => _rfcToValue(d));
    } else if (typeof data === 'object') {
        return Object.entries(data).reduce((acc, [k, v]) => {
            acc[k] = _rfcToValue(v);
            return acc;
        }, {});
    } else {
        throw new TypeError('RfcToValue: Unsupported type');
    }
}
export function rfcToValue(data: GifRfc): GifRfcValue {
    return _rfcToValue(data) as GifRfcValue;
}
