import { GifHeader } from './header';
import { GifLogicalScreenDescriptor } from './logicalScreenDescriptor';

export interface GifRfc {
    header: GifHeader;
    logicalScreen: {
        descriptor: GifLogicalScreenDescriptor;
    };
}
