// export * from '@/types';
// export { GifAnalyzer } from '@/utils/analyzer';

import * as moduleAlias from 'module-alias';
import * as path from 'path';
import * as fs from 'fs';
moduleAlias.addAlias('@', path.join(process.cwd(), 'dist'));
import { GifAnalyzer } from '@/utils/analyzer';
const gif = new GifAnalyzer(fs.readFileSync('./test.gif'));
// console.log(JSON.stringify(gif.value, null, 2));
// console.log(JSON.stringify(gif.raw, null, 2));

console.log(gif.rfc.logicalScreen.descriptor.packedFields.bytes);
gif.rfc.logicalScreen.descriptor.packedFields.value = {
    colorResolution: 0,
    globalColorTableFlag: true,
    globalColorTableSize: 0,
    sortFlag: false
};
console.log(gif.rfc.logicalScreen.descriptor.packedFields.bytes);
