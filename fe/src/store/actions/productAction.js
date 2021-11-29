import { createProductAPI, deleteProductAPI, getProductsAPI, searchProductsAPI, updateProductAPI } from "../../api/productApi";
import { turnOnMessageAction } from "./messageAction";

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
export const PRODUCT_NEXTPAGE = 'PRODUCT_NEXTPAGE';
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

const productGet = (products, query) => {
    return {
        type: PRODUCT_GET,
        payload: { products, query }
    }
}

const productError = (msg) => {
    return {
        type: PRODUCT_ERROR,
        payload: msg
    }
}

const productNextPage = (products) => {
    return {
        type: PRODUCT_NEXTPAGE,
        payload: products
    }
}

const productStopPage = (products) => {
    return {
        type: PRODUCT_STOPPAGE,
        payload: products
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

export const getProductsAction = (query) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        const state = getState();
        const products = state.products;
        try {
            const res = await getProductsAPI(query, products.limit, 0);
            console.log(res.data)
            dispatch(productGet(res.data, query));
        } catch (err) {
            if (err.response) {
                dispatch(productError(err.response.data.msg))
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}

export const nextPageAction = () => {
    return async (dispatch, getState) => {
        const products = getState().products;
        const { query, limit, page } = products;
        dispatch(productRequest());
        try {
            const res = await getProductsAPI(query, limit, page + 1);
            if (res.data.length < limit) {
                console.log('stop');
                dispatch(productStopPage(res.data));
                return;
            }
            dispatch(productNextPage(res.data));
        } catch (err) {
            if (err.response) {
                dispatch((err.response.data.msg))
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