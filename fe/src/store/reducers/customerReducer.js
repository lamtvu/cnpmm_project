import { CUSTOMER_ENDPAGE, CUSTOMER_ERROR, CUSTOMER_GET, CUSTOMER_NEXTPAGE, CUSTOMER_REQUEST } from "../actions/customerAction"

const initalState = {
    page: 0,
    items: [],
    limit: 20,
    searchString: '',
    loading: false,
    error: null,
}

const customerReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case CUSTOMER_REQUEST:
            return { loading: true, ...state, error: null };
        case CUSTOMER_GET:
            return {
                ...state,
                loading: false, page: 0,
                searchString: payload.searchString,
                items: payload.customers
            }
        case CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CUSTOMER_NEXTPAGE:
            return {
                ...state,
                loading: false,
                page: state.page + 1,
                items: [...state.items, ...payload]
            }
        case CUSTOMER_ENDPAGE:
            return {
                ...state,
                loading: false,
                page: -1
            }
        default:
            return { ...state }
    }
}

export default customerReducer