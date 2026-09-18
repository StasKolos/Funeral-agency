export type ProductCategory = {
    id: number;
    code: string;
    name: string;
    minPrice: number | null;
    imageUrl?: string | undefined;
};

export type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    categoryId: number;
};

export type PaginatedResponse<Item> = {
    items: Item[];
    page: number;
    size: number;
    total: number;
    totalPages: number;
};
