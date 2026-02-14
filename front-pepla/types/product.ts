export type ProductType = {
    id: number;
    documentId: string;
    productName: string;
    slug: string;
    description: string;
    active: boolean;
    price: number;
    origin: string;
    genero: string;
    isFeatured: boolean | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: Array<{
        id: number;
        documentId: string;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        url: string;
        formats: {
            thumbnail?: {
                url: string;
            };
            small?: {
                url: string;
            };
            medium?: {
                url: string;
            };
        };
    }>;
    category: {
        id: number;
        documentId: string;
        categoryName: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}