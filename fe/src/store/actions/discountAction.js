import { addProductDiscountAPI, createDiscountAPI, deleteDiscountAPI, getDiscountsAPI, getProductDiscountAPI, removeProductDiscountAPI, updateDiscountAPI } from "../../api/discountApi";
import { turnOnMessageAction } from "./messageAction";

export const DISCOUNT_REQUEST = 'DISCOUNT_REQUEST';
export const DPRODUCT_REQUEST = 'DPRODUCT_REQUEST';
export const DISCOUNT_SUCCESS = 'DISCOUNT_SUCCESS';
export const DPRODUCT_SUCCESS = 'DPRODUCT_SUCCESS';
export const DISCOUNT_ERROR = 'DISCOUNT_ERROR';
export const DPRODUCT_ERROR = 'DPRODUCT_ERROR';
export const DISCOUNT_SELECT = 'DISCOUNT_SELECT';

export const discountSelect = (products, id) => {
    return {
        type: DISCOUNT_SELECT,
        payload: { ...products, id }
    }
}

const discountRequest = () => {
    return {
        type: DISCOUNT_REQUEST
    }
}

const discountSuccess = (discounts) => {
    return {
        type: DISCOUNT_SUCCESS,
        payload: discounts
    }
}

const discountError = (error) => {
    return {
        type: DISCOUNT_ERROR,
        payload: error
    }
}

const dproductRequest = () => {
    return {
        type: DPRODUCT_REQUEST
    }
}

const dproductSuccess = (products, limit) => {
    return {
        type: DPRODUCT_SUCCESS,
        payload: { ...products, limit }
    }
}
const dproductError = (error) => {
    return {
        type: DPRODUCT_ERROR,
        payload: error
    }
}

export const getDiscountAction = () => {
    return async (dispatch) => {
        dispatch(discountRequest());
        try {
            const res = await getDiscountsAPI();
            dispatch(discountSuccess(res.data));
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }
    }
}

export const getDiscountProductAction = (id, page, limit, searchString) => {
    return async (dispatch) => {
        dispatch(dproductRequest());
        try {
            const res = await getProductDiscountAPI(id, page, limit, searchString);
            dispatch(dproductSuccess(res.data, limit));
        } catch (err) {
            dispatch(dproductError(err.response?.data?.msg))
        }
    }
}

export const createDiscountAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(discountRequest());
        try {
            await createDiscountAPI(data);
            dispatch(getDiscountAction());
            dispatch(turnOnMessageAction('GOBAL', 'Create discount success'));
            navigate('/admin/discounts')
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }

    }
}

export const SelectDiscontAction = (id) => {
    return async (dispatch, getState) => {
        dispatch(dproductRequest());
        const state = getState().discounts;
        try {
            console.log('select')
            const res = await getProductDiscountAPI(id, 0, state.plimit, '');
            dispatch(discountSelect(res.data, id))
        } catch (err) {
            dispatch(dproductError(err.response?.data?.msg));
        }
    }
}

export const deleteDiscountAction = () => {
    return async (dispatch, getState) => {
        dispatch(discountRequest());
        const state = getState().discounts
        try {
            await deleteDiscountAPI(state.selected);
            dispatch(getDiscountAction());
            dispatch(turnOnMessageAction('GOBAL', 'Delete discount success'));
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }

    }
}

export const removeProductDiscountAction = (productId) => {
    return async (dispatch, getState) => {
        dispatch(dproductRequest());
        const state = getState().discounts;
        try {
            await removeProductDiscountAPI(productId);
            dispatch(getDiscountProductAction(state.selected, 0, state.plimit, ''))
            dispatch(turnOnMessageAction('GOBAL', 'Remove product success'));
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }
    }
}

export const addProductDiscountAction = (products) => {
    return async (dispatch, getState) => {
        dispatch(dproductRequest());
        const state = getState().discounts;
        try {
            await addProductDiscountAPI(state.selected, products);
            dispatch(getDiscountProductAction(state.selected, 0, state.plimit, ''))
            dispatch(turnOnMessageAction('GOBAL', 'add products success'));
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }
    }
}

export const updateDiscountAction = (id, data, navigate) => {
    return async (dispatch) => {
        dispatch(discountRequest());
        try {
            await updateDiscountAPI(id, data);
            dispatch(getDiscountAction());
            dispatch(turnOnMessageAction('GOBAL', 'Add products success'));
            navigate('/admin/discounts')
        } catch (err) {
            dispatch(discountError(err.response?.data?.msg))
        }

    }
}