import { addBrandAPI, deleteBrandAPI, getBrandsAPI, updateBrandAPI } from "../../api/brandApi";

export const BRAND_REQUEST = 'BRAND_REQUEST';
export const BRAND_SUCCESS = 'BRAND_SUCCESS';
export const BRAND_SELECT = 'BRAND_SELECT'
export const BRAND_ERROR = 'BRAND_ERROR';

const brandsRequest = () => {
    return {
        type: BRAND_REQUEST
    }
}

const brandsError = (err) => {
    return {
        type: BRAND_ERROR,
        payload: err,
    }
}

const brandsSuccess = (brands) => {
    return {
        type: BRAND_SUCCESS,
        payload: brands,
    }
}

const brandSelect = (brand) => {
    return {
        type: BRAND_SELECT,
        payload: brand,
    }
}

export const getBrandsAction = () => {
    return async (dispatch) => {
        dispatch(brandsRequest());
        try {
            const res = await getBrandsAPI();
            dispatch(brandsSuccess(res.data));
        } catch (err) {
            if (err.response) {
                dispatch(brandsError(err.response.data.err));
                return;
            }
            dispatch(brandsError('Network Error'));
        }
    }
}

export const deleteBrandAction = (id) => {
    return async (dispatch) => {
        dispatch(brandsRequest());
        try {
            await deleteBrandAPI(id);
            dispatch(getBrandsAction());
        } catch (err) {
            if (err.response) {
                dispatch(brandsError(err.response.data.err));
                return;
            }
            dispatch(brandsError('Network Error'));
        }
    }
}

export const addBrandAction = (data) => {
    return async (dispatch) => {
        dispatch(brandsRequest());
        try {
            await addBrandAPI(data);
            dispatch(getBrandsAction());
        } catch (err) {
            if (err.response) {
                dispatch(brandsError(err.response.data.err));
                return;
            }
            dispatch(brandsError('Network Error'));
        }
    }
}

export const updateBrandAction = (data) => {
    return async (dispatch, getState) => {
        dispatch(brandsRequest());
        const state = getState();
        const id = state.brands.selected._id;
        try {
            await updateBrandAPI(id, data);
            dispatch(getBrandsAction());
        } catch (err) {
            if (err.response) {
                dispatch(brandsError(err.response.data.err));
                return;
            }
            dispatch(brandsError('Network Error'));
        }
    }
}

export const selectBandAction = (id) => {
    return async (dispatch, getState) => {
        if (!id) {
            dispatch(brandSelect(null));
            return;
        }
        const state = getState();
        const brands = state.brands.items;
        const brand = brands.find(cate => cate._id === id);
        dispatch(brandSelect({ ...brand }));
    }
}