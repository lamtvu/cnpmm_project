import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_NEXTPAGE, PRODUCT_REQUEST, PRODUCT_SEARCH, PRODUCT_STOPPAGE, PRODUCT_SUCCESS } from "../actions/productAction"

const initState = {
    loading: false,
    error: '',
    items: null,
    query: null,
    type: null,
    limit: 20,
    page: 0
}

const ProductReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_FILTER:
            return {
                ...state,
                loading: false,
                query: payload.query,
                items: payload.products,
                page: 0,
                type: 'FILTER'
            };
        case PRODUCT_SEARCH:
            return {
                ...state,
                loading: false,
                query: payload.query,
                items: payload.products,
                page: 0,
                type: 'SEARCH'
            };
        case PRODUCT_NEXTPAGE:
            return {
                ...state,
                loading: false,
                items: payload.products,
                page: state.page + 1
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case PRODUCT_STOPPAGE:
            return {
                ...state,
                loading: false,
                page: -1
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            }
    }
}

export default ProductReducer
