import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_ERROR, CATEGORY_SELECT } from "../actions/categoriyActions";

const initialState = {
    loading: false,
    err: '',
    items: [],
    selected: null,
}

export const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CATEGORY_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_SUCCESS:
            return { selected: null, loading: false, items: payload };
        case CATEGORY_ERROR:
            return { ...state, loading: false, err: payload };
        case CATEGORY_SELECT:
            return { ...state, selected: payload };
        default:
            return { ...state }
    }

}
