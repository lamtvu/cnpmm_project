import { BRAND_REQUEST, BRAND_SUCCESS, BRAND_ERROR, BRAND_SELECT } from './../actions/brandAction'

const initialState = {
    loading: false,
    err: '',
    items: [],
    selected: null,
}

export const brandReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BRAND_REQUEST:
            return { ...state, loading: true };
        case BRAND_SUCCESS:
            return { selected: null, loading: false, items: payload };
        case BRAND_ERROR:
            return { ...state, loading: false, err: payload };
        case BRAND_SELECT:
            return { ...state, selected: payload };
        default:
            return { ...state }
    }

}
