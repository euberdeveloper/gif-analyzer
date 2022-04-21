import { BytesView } from '@blackmirror/bytes-view';

export function* iterateDataSubBlocks<B>(
    bytes: BytesView<B>,
    offset: number
): Generator<[number, number, BytesView<B>]> {
    for (let subBlockSize = bytes.readUint8(offset++); subBlockSize !== 0; subBlockSize = bytes.readUint8(offset++)) {
        yield [offset, subBlockSize, bytes];
        offset += subBlockSize;
    }
}

export function getDataSubBlocksSize<B>(bytes: BytesView<B>, offset: number): number {
    let size = 0;

    for (const [_offset, subBlockSize] of iterateDataSubBlocks(bytes, offset)) {
        size += subBlockSize + 1;
    }
    size += 1;

    return size;
}

export function parseDataSubBlocks<B, T>(
    bytes: BytesView<B>,
    offset: number,
    subBlockParser: (subBlock: BytesView<B>) => T
): T[] {
    const parsedBlocks: T[] = [];

    for (const [currOffset, subBlockSize, buffer] of iterateDataSubBlocks(bytes, offset)) {
        const subBlock = buffer.slice(currOffset, currOffset + subBlockSize);
        parsedBlocks.push(subBlockParser(subBlock));
    }

    return parsedBlocks;
}
