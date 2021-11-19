import { is } from "@babel/types";
import { createProductAPI, createProducts, deleteProductAPI, getsProductsAPI, searchProductsAPI, updateProductAPI } from "../../api/productApi";

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
export const PRODUCT_NEXTPAGE = 'PRODUCT_NEXTPAGE';
export const PRODUCT_STOPPAGE = 'PRODUCT_STOPPAGE';
export const PRODUCT_SEARCH = 'PRODUCT_SEARCH';
export const PRODUCT_FILTER = 'PRODUCT_FILTER';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';

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

const productSearch = (products, query) => {
    return {
        type: PRODUCT_SEARCH,
        payload: { products, query }
    }
}

const productFilter = (products, query) => {
    return {
        type: PRODUCT_FILTER,
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

const productStopPage = () => {
    return {
        type: PRODUCT_STOPPAGE,
    }
}

export const searchProductsAction = (searchString) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        const state = getState();
        const products = state.products;
        try {
            const res = await searchProductsAPI(searchString, products.limit, 0);
            dispatch(productSearch(res.data, searchString));
        } catch (err) {
            if (err.response) {
                dispatch(productError(err.response.data.msg))
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}

export const filterProductsAction = (filterQuery) => {
    return async (dispatch, getState) => {
        dispatch(productRequest());
        const state = getState();
        const products = state.products;
        try {
            const res = await getsProductsAPI(filterQuery, products.limit, 0);
            dispatch(productFilter(res.data, filterQuery));
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
            const res = await searchProductsAPI(query, limit, page + 1);
            if (res.data.length === 0) {
                dispatch(productStopPage());
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

export const addProductAction = (product) => {
    return async (dispatch) => {
        dispatch(productRequest());
        try {
            const res = await createProductAPI(product);
            console.log(res)
            dispatch(productSuccess());
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

export const updateProductAction = (id, product) => {
    return async (dispatch) => {
        dispatch(productRequest());
        try {
            await updateProductAPI(id, product);
            dispatch(productSuccess());
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
    return async (dispatch) => {
        dispatch(productRequest());
        try {
            await deleteProductAPI(id);
            dispatch(productSuccess());
        } catch (err) {
            if (err.response) {
                dispatch((err.response.data.msg));
                return;
            }
            dispatch(productError('Network Error'));
        }
    }
}