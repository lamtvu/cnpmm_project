import { CUSTOMER_ENDPAGE, CUSTOMER_ERROR, CUSTOMER_GET, CUSTOMER_NEXTPAGE, CUSTOMER_REQUEST } from "../actions/customerAction"

const initalState = {
    page: 0,
    items: [],
    limit: 10,
    searchString: '',
    loading: false,
    total:0,
    error: null,
}

const customerReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case CUSTOMER_REQUEST:
            return { ...state, loading: true, error: null };
        case CUSTOMER_GET:
            return {
                ...state,
                loading: false, page: 0,
                searchString: payload.searchString,
                items: payload.customers.results,
                total: payload.customers.count
            }
        case CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return { ...state }
    }
}

export default customerReducer