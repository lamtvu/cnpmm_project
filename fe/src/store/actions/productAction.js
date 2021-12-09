import { createProductAPI, deleteProductAPI, getProductsAPI, searchProductsAPI, updateProductAPI } from "../../api/productApi";
import { turnOnMessageAction } from "./messageAction";

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
export const PRODUCT_STOPPAGE = 'PRODUCT_STOPPAGE';
export const PRODUCT_SEARCH = 'PRODUCT_SEARCH';
export const PRODUCT_GET = 'PRODUCT_GET';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_CLEAR = 'PRODUCT_CLEAR';

const productRequest = () => {
    return {
        type: PRODUCT_REQUEST
    }
}

const productSuccess = () => {
    return {
        type: PRODUCT_SUCCESS
    }
}

const productSearch = (products, query, limit) => {
    return {
        type: PRODUCT_SEARCH,
        payload: { ...products, query, limit }
    }
}

const productGet = (products, query, limit) => {
    return {
        type: PRODUCT_GET,
        payload: { ...products, query, limit }
    }
}

const productError = (msg) => {
    return {
        type: PRODUCT_ERROR,
        payload: msg
    }
}


export const clearProducts = () => {
    return {
        type: PRODUCT_CLEAR
    }
}

export const searchProductsAction = (searchString, page, limit) => {
    return async (dispatch) => {
        dispatch(productRequest());
        try {
            const res = await searchProductsAPI(searchString, limit, page);
            console.log(res)
            dispatch(productSearch(res.data, searchString, limit));
        } catch (err) {
            if (err.response) {
                dispatch(productError(err.response.data.msg))
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}

export const getProductsAction = (query, page, limit) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        try {
            const res = await getProductsAPI(query, limit, page);
            dispatch(productGet(res.data, query, limit));
        } catch (err) {
            if (err.response) {
                dispatch(productError(err.response.data.msg))
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}

export const addProductAction = (product, successCallBack) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        try {
            const productState = getState().products;
            await createProductAPI(product);
            dispatch(productSuccess());
            dispatch(searchProductsAction(productState.query));
            dispatch(turnOnMessageAction('GOBAL', 'successful create'))
            successCallBack();
        } catch (err) {
            if (err.response?.status === 500) {
                dispatch(productError('Internal Err Error'));
                return;
            }
            dispatch((err.response.data.msg))
            return;
        }
        dispatch(productError('Network Error'));
    }
}

export const updateProductAction = (id, product, successCallBack) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        try {
            const productState = getState().products;
            await updateProductAPI(id, product);
            dispatch(searchProductsAction(productState.query));
            dispatch(turnOnMessageAction('GOBAL', 'successful update'))
            successCallBack && successCallBack();
        } catch (err) {
            if (err.response) {
                dispatch(productError(err.response.data.msg));
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}

export const deleteProductAction = (id) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        const productState = getState().products;
        try {
            await deleteProductAPI(id);
            dispatch(productSuccess());
            dispatch(turnOnMessageAction('GOBAL', 'successful update'))
            if (productState.type === 'GET')
                dispatch(getProductsAction(productState.query));
            else
                dispatch(searchProductsAction(productState.query));
        } catch (err) {
            if (err.response) {
                dispatch((err.response.data.msg));
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}