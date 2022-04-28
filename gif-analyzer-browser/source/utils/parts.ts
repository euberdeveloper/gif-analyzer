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

import { InstantiatorArrayBuffer } from './instantiator';

export class GifHeaderArrayBuffer extends GifHeader<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifLogicalScreenDescriptorArrayBuffer extends GifLogicalScreenDescriptor<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifColorArrayBuffer extends GifColor<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifGraphicControlExtensionArrayBuffer extends GifGraphicControlExtension<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifImageDescriptorArrayBuffer extends GifImageDescriptor<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifTableBasedImageDataArrayBuffer extends GifTableBasedImageData<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifPlainTextExtensionArrayBuffer extends GifPlainTextExtension<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifApplicationExtensionArrayBuffer extends GifApplicationExtension<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifCommentExtensionArrayBuffer extends GifCommentExtension<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}

export class GifTrailerArrayBuffer extends GifTrailer<ArrayBuffer> {
    protected initializeInstantiator(): Instantiator<ArrayBuffer> {
        return new InstantiatorArrayBuffer();
    }
}
