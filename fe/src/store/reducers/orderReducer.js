import { MYORDER_SUCCESS, ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../actions/orderAction"

const initalState = {
    loading: false,
    items: [],
    error: null,
    limit: 10,
    searchString: '',
    total: 0,
}

const orderReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case ORDER_REQUEST:
            return { ...state, loading: true, error: null };
        case ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                items: payload.results,
                limit: payload.limit,
                total: payload.count,
                searchString: payload.searchString
            };
        case MYORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                items: payload
            }
        case ORDER_ERROR:
            return { ...state, loading: false, error: payload };
        default:
            return { ...state }
    }
}

export default orderReducer;