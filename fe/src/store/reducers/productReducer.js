import { PRODUCT_CLEAR, PRODUCT_ERROR, PRODUCT_GET, PRODUCT_NEXTPAGE, PRODUCT_REQUEST, PRODUCT_SEARCH, PRODUCT_STOPPAGE, PRODUCT_SUCCESS } from "../actions/productAction"

const initState = {
    loading: false,
    error: '',
    items: [],
    total: 0,
    query: null,
    type: null,
    limit: 10,
    page: -1
}

const ProductReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_GET:
            return {
                ...state,
                loading: false,
                query: payload.query,
                items: payload.products,
                page: 0,
                type: 'GET'
            };
        case PRODUCT_SEARCH:
            return {
                ...state,
                loading: false,
                query: payload.query,
                items: payload.results,
                total: payload.count,
                limit: payload.limit,
                page: 0,
                type: 'SEARCH'
            };
        case PRODUCT_NEXTPAGE:
            return {
                ...state,
                loading: false,
                items: [...state.items, ...payload],
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
                items: [...state.items, ...payload],
                page: -1
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case PRODUCT_CLEAR:
            return { ...initState }
        default:
            return { ...state };
    }
}

export default ProductReducer
