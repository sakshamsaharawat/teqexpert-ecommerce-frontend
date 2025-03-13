export interface ProductItem {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    price: number
}
export interface ProductResponse {
    success: boolean;
    message: string;
    data: ProductItem[];
}