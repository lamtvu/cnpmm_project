import { DISCOUNT_ERROR, DISCOUNT_REQUEST, DISCOUNT_SELECT, DISCOUNT_SUCCESS, DPRODUCT_ERROR, DPRODUCT_REQUEST, DPRODUCT_SUCCESS } from "../actions/discountAction"

const initState = {
    dloading: false,
    ploading: false,
    derror: null,
    perror: null,
    ptotal: 0,
    plimit: 10,
    discounts: [],
    products: [],
    selected: null,
}

const discountReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case DISCOUNT_REQUEST:
            return { ...state, dloading: true };
        case DISCOUNT_SUCCESS:
            return {
                ...state,
                dloading: false,
                lproducts: [],
                discounts: payload,
                selected: null
            };
        case DISCOUNT_ERROR:
            return { ...state, dloading: false, perror: payload };
        case DPRODUCT_REQUEST:
            return { ...state, ploading: true };
        case DPRODUCT_SUCCESS:
            return {
                ...state, ploading: false,
                products: payload.results,
                ptotal: payload.count,
                limit: payload.limit
            };
        case DPRODUCT_ERROR:
            return { ...state, ploading: false, perror: payload };
        case DISCOUNT_SELECT:
            return {
                ...state,
                selected: payload.id,
                ploading: false,
                products: payload.results,
                ptotal: payload.count,
            }
        default:
            return { ...state }
    }
}

export default discountReducer