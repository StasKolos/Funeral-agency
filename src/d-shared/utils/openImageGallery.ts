type ImageGalleryItem = {
    alt: string;
    src: string;
};

const GALLERY_INITIAL_SCALE = 1;
const GALLERY_MAX_SCALE = 4;
const GALLERY_MIN_SCALE = 0.6;
const GALLERY_START_POSITION = 0;

export const openImageGallery = async (items: ImageGalleryItem[], startIndex: number) => {
    const [{ Fancybox }] = await Promise.all([
        import('@fancyapps/ui'),
        import('@fancyapps/ui/dist/fancybox/fancybox.css'),
    ]);

    Fancybox.show(
        items.map((item) => ({
            caption: item.alt,
            src: item.src,
            type: 'image',
        })),
        {
            mainClass: 'app-fancybox',
            startIndex,
            dragToClose: true,
            Carousel: {
                Thumbs: {
                    type: 'classic',
                },
                Toolbar: {
                    display: {
                        left: ['infobar'],
                        middle: [],
                        right: ['zoomIn', 'zoomOut', 'toggle1to1', 'thumbs', 'close'],
                    },
                    enabled: true,
                },
                Zoomable: {
                    Panzoom: {
                        maxScale: GALLERY_MAX_SCALE,
                        minScale: GALLERY_MIN_SCALE,
                        startPos: {
                            scale: GALLERY_INITIAL_SCALE,
                            x: GALLERY_START_POSITION,
                            y: GALLERY_START_POSITION,
                        },
                    },
                },
            },
        },
    );
};
