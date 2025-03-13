import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, UPDATE_CART_FAILURE, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS } from "./ActionTypes";
import { ProductInitialState } from "./interface/task-state.interface";

const initialState: ProductInitialState = {
    products: [],
    cart: [],
    isLoading: false,
    error: null
}

export const productReducer = (state: ProductInitialState = initialState, action: any): ProductInitialState => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                products: [],
                isLoading: true,
                error: null
            }
        case GET_CART_REQUEST:
            return {
                ...state,
                cart: [],
                isLoading: true,
                error: null
            }
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case UPDATE_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case UPDATE_CART_SUCCESS:
            if (action.payload.isAdded) {
                const isProductInCart = state.cart.find(cartItem => cartItem.product_id === action.payload.product_id);
                if (isProductInCart) {
                    return {
                        ...state,
                        isLoading: false,
                        error: null,
                        cart: state.cart.map(cartItem => {
                            if (cartItem.product_id === action.payload.product_id) {
                                return { ...cartItem, quantity: cartItem.quantity + 1 }
                            } else {
                                return cartItem
                            }
                        })
                    }
                } else {
                    return {
                        ...state,
                        isLoading: false,
                        error: null,
                        cart: [...state.cart, {
                            product_id: action.payload.product_id,
                            user_id: action.payload.user_id,
                            quantity: 1,
                            price: action.payload.price
                        }]
                    }
                }
            } else {
                const isProductInCart = state.cart.find(cartItem => cartItem.product_id === action.payload.product_id);
                if (isProductInCart && isProductInCart.quantity <= 1) {
                    return {
                        ...state,
                        isLoading: false,
                        error: null,
                        cart: state.cart.filter(cartItem => cartItem.product_id === action.payload.product_id)
                    }
                } else if(isProductInCart && isProductInCart.quantity > 1) {
                    return {
                        ...state,
                        isLoading: false,
                        error: null,
                        cart: state.cart.map(cartItem => {
                            if (cartItem.product_id === action.payload.product_id) {
                                return { ...cartItem, quantity: cartItem.quantity - 1 }
                            } else {
                                return cartItem
                            }
                        })
                    }
                }
            }
        return state;
        case UPDATE_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                error: null
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
                isLoading: false,
                error: null
            }
        case GET_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
                isLoading: false,
                error: null
            }
        case GET_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                products: [],
                isLoading: false
            }
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                products: state.products,
                isLoading: false
            }
        case GET_CART_FAILURE:
            return {
                ...state,
                cart: [],
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}