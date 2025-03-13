import { CartItem } from "./get-count.interface";
import { ProductItem } from "./get-task.interface";

export interface ProductInitialState {
    products: ProductItem[];
    cart: CartItem[];
    isLoading: boolean;
    error: string | null;
} 