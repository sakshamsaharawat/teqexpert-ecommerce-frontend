import { Dispatch } from 'redux';
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, UPDATE_CART_FAILURE, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS } from "./ActionTypes";
import { ProductData } from "./interface/create-task.interface";
import axiosInstance from '../../utils/axiosInstance';
import { showError } from '../../utils/showErrors';
import { ProductItem, ProductResponse } from './interface/get-task.interface';
import { CartItem } from './interface/get-count.interface';

const createProductRequest = () => ({ type: CREATE_PRODUCT_REQUEST });
const createProductSuccess = (product: ProductData) => ({ type: CREATE_PRODUCT_SUCCESS, payload: product });
const createProductFailure = (error: string) => ({ type: CREATE_PRODUCT_FAILURE, payload: error });

export const createProduct = (product: ProductData) => async (dispatch: Dispatch) => {
    dispatch(createProductRequest());
    try {
        const response = await axiosInstance.post("product/create", product);
        dispatch(createProductSuccess(response.data.data));
        return { success: true }
    } catch (error: any) {
        dispatch(createProductFailure(error.message));
        showError(error.data.message);
    }
}

const getProductRequest = () => ({ type: GET_PRODUCT_REQUEST });
const getProductSuccess = (products: ProductResponse) => ({ type: GET_PRODUCT_SUCCESS, payload: products });
const getProductFailure = (error: any) => ({ type: GET_PRODUCT_FAILURE, payload: error });

export const getProduct = () => async (dispatch: Dispatch) => {
    dispatch(getProductRequest());
    try {
        const response = await axiosInstance.get(`product`);
        dispatch(getProductSuccess(response.data.data));
    } catch (error: any) {
        dispatch(getProductFailure(error.message));
        showError(error.data.message);
    }
}

const getCartRequest = () => ({ type: GET_CART_REQUEST });
const getCartSuccess = (cart: CartItem[]) => ({ type: GET_CART_SUCCESS, payload: cart });
const getCartFailure = (error: string) => ({ type: GET_CART_FAILURE, payload: error });

export const getCart = () => async (dispatch: Dispatch) => {
    dispatch(getCartRequest());
    try {
        const response = await axiosInstance.get(`cart`);
        dispatch(getCartSuccess(response.data.data));
    } catch (error: any) {
        dispatch(getCartFailure(error.message));
        showError(error.data.message);
    }
}

const updateCartRequest = () => ({ type: UPDATE_CART_REQUEST });
const updateCartSuccess = (product: ProductItem, user_id: string | undefined, isAdded: boolean) => ({ type: UPDATE_CART_SUCCESS, payload: { product, user_id, isAdded } });
const updateCartFailure = (error: string) => ({ type: UPDATE_CART_FAILURE, payload: error });

export const updateCart = (product: ProductItem, isAdded: boolean, user_id: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(updateCartRequest());
    try {
        await axiosInstance.patch(`cart`, { productId: product._id, isAdded });
        dispatch(updateCartSuccess(product, user_id, isAdded));
    } catch (error: any) {
        dispatch(updateCartFailure(error.message));
        showError(error.data.message);
    }
}

