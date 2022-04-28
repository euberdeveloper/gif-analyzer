import {
    GifApplicationExtension,
    GifColor,
    GifCommentExtension,
    GifGraphicControlExtension,
    GifHeader,
    GifImageDescriptor,
    GifLogicalScreenDescriptor,
    GifPlainTextExtension,
    GifTableBasedImageData,
    GifTrailer,
    Instantiator
} from 'gif-analyzer-core';

import { InstantiatorBuffer } from './instantiator';

export class GifHeaderBuffer extends GifHeader<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifLogicalScreenDescriptorBuffer extends GifLogicalScreenDescriptor<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifColorBuffer extends GifColor<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifGraphicControlExtensionBuffer extends GifGraphicControlExtension<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifImageDescriptorBuffer extends GifImageDescriptor<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifTableBasedImageDataBuffer extends GifTableBasedImageData<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifPlainTextExtensionBuffer extends GifPlainTextExtension<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifApplicationExtensionBuffer extends GifApplicationExtension<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifCommentExtensionBuffer extends GifCommentExtension<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}

export class GifTrailerBuffer extends GifTrailer<Buffer> {
    protected initializeInstantiator(): Instantiator<Buffer> {
        return new InstantiatorBuffer();
    }
}
