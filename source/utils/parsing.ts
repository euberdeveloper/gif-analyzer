export function* iterateDataSubBlocks(bytes: Buffer, offset: number): Generator<[number, number, Buffer]> {
    for (let subBlockSize = bytes.readUInt8(offset++); subBlockSize !== 0; subBlockSize = bytes.readUInt8(offset++)) {
        yield [offset, subBlockSize, bytes];
        offset += subBlockSize;
    }
}

export function getDataSubBlocksSize(bytes: Buffer, offset: number): number {
    let size = 0;

    for (const [_offset, subBlockSize] of iterateDataSubBlocks(bytes, offset)) {
        size += subBlockSize + 1;
    }
    size += 1;

    return size;
}

export function parseDataSubBlocks<T>(bytes: Buffer, offset: number, subBlockParser: (subBlock: Buffer) => T): T[] {
    const parsedBlocks: T[] = [];

    for (const [currOffset, subBlockSize, buffer] of iterateDataSubBlocks(bytes, offset)) {
        const subBlock = buffer.slice(currOffset, currOffset + subBlockSize);
        parsedBlocks.push(subBlockParser(subBlock));
    }

    return parsedBlocks;
}
