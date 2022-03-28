import * as moduleAlias from 'module-alias';
import * as path from 'path';
moduleAlias.addAlias('@', path.join(process.cwd(), 'dist'));

export * from '@/utils/analyzer';

import * as fs from 'fs';
import { GifAnalyzer } from '@/utils/analyzer';
const gif = fs.readFileSync('./test.gif');
const gifAnalyzer = new GifAnalyzer(gif);
console.log(gifAnalyzer.rfcParts);
