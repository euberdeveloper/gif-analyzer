function getMask(start: number, end: number): number {
    let mask = 0;
    for (let i = 0; i < 8; i++) {
        mask <<= 1;
        mask += i >= start && i < end ? 1 : 0;
    }
    return mask;
}

export function readBits(byte: number, start: number, end: number): number {
    const mask = getMask(start, end);
    return (byte & mask) >> (8 - end);
}

export function writeBits(byte: number, start: number, end: number, value: number): number {
    const mask = getMask(start, end);
    return (byte & ~mask) | ((value << (8 - end)) & mask);
}
