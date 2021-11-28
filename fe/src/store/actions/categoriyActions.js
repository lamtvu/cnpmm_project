import { getCagtegoriesAPI, deleteCategoryAPI, updateCategoryAPI, addCatetoryAPI } from './../../api/categotyApi';
import { turnOnMessageAction } from './messageAction';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_SELECT = 'CATEGORY_SELECT'
export const CATEGORY_ERROR = 'CATEGORY_ERROR';

const categoriesRequest = () => {
    return {
        type: CATEGORY_REQUEST
    }
}

const categoriesError = (err) => {
    return {
        type: CATEGORY_ERROR,
        payload: err,
    }
}

const categoriesSuccess = (categories) => {
    return {
        type: CATEGORY_SUCCESS,
        payload: categories,
    }
}

const categoriesSelect = (category) => {
    return {
        type: CATEGORY_SELECT,
        payload: category,
    }
}
export const getCagtegoriesAction = (msg) => {
    return async (dispatch) => {
        dispatch(categoriesRequest());
        try {
            const res = await getCagtegoriesAPI();
            dispatch(categoriesSuccess(res.data));
            if (msg)
                dispatch(turnOnMessageAction('GOBAL', msg))
        } catch (err) {
            console.log(err);
            if (err.response) {
                dispatch(categoriesError(err.response.data.msg));
                return;
            }
            dispatch(categoriesError('Error network'));
        }
    }
}

export const addCategoryAction = (data) => {
    return async (dispatch) => {
        dispatch(categoriesRequest());
        try {
            await addCatetoryAPI(data);
            dispatch(getCagtegoriesAction('successful create'));
        } catch (err) {
            console.log(err)
            if (err.response) {
                dispatch(categoriesError(err.response.data.msg));
                return;
            }
            dispatch(categoriesError('Error network'));
        }
    }
}

export const deleteCategoryAction = (id) => {
    return async (dispatch) => {
        dispatch(categoriesRequest());
        try {
            await deleteCategoryAPI(id);
            dispatch(getCagtegoriesAction('successfull delete'));
        } catch (err) {
            if (err.response) {
                dispatch(categoriesError(err.response.data.msg));
                return;
            }
            dispatch(categoriesError('Error network'));
        }
    }
}

export const updateCategoryAction = (data) => {
    return async (dispatch, getState) => {
        dispatch(categoriesRequest());
        const state = getState();
        const selected = state.categories.selected;
        try {
            await updateCategoryAPI(selected._id, data);
            dispatch(getCagtegoriesAction('successfull update'));
        } catch (err) {
            console.log(err.response)
            if (err.response) {
                dispatch(categoriesError(err.response.data.msg));
            }
            dispatch(categoriesError(err.response.data.msg));
        }
    }
}

export const selectCategoryAction = (id) => {
    return async (dispatch, getState) => {
        if (!id) {
            dispatch(categoriesSelect(null));
            return;
        }
        const state = getState();
        const categories = state.categories.items;
        const category = categories.find(cate => cate._id === id);
        dispatch(categoriesSelect({ ...category }));
    }
}

