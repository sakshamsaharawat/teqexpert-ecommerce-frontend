import { ProductItem } from "./get-task.interface";

export interface CartItem {
    product_id: string,
    user_id: string,
    quantity: number,
    price: number,
    product: ProductItem
}