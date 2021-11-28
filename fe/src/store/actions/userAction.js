import { changeInfoAPI, changePasswordAPI, getInforAPI } from "../../api/userApi";

export const USER_SET = 'USER_SET';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_ERROR = 'USER_ERROR'

export const setUser = (user) => {
    return {
        type: USER_SET,
        payload: user
    }
}
const userRequest = () => {
    return {
        type: USER_REQUEST,
    }
}

const userError = (err) => {
    return {
        type: USER_ERROR,
        payload: err
    }
}

export const getUserAction = () => {
    return async (dispatch) => {
        dispatch(userRequest());
        try {
            const res = await getInforAPI();
            dispatch(setUser(res.data));
        } catch {
            console.log('get info failed');
        }
    }
}

export const userChangeInfoAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(userRequest());
        try {
            const res = await changeInfoAPI(data);
            console.log(res.data)
            dispatch(setUser(res.data))
            navigate('/user/information', { state:{msg: 'Successful change information'} });
        } catch (err) {
            dispatch(userError(err.response?.data?.msg))
        }

    }
}

export const userChangePasswordAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(userRequest());
        try {
            await changePasswordAPI(data);
            navigate('/user/information', { state:{msg: 'Successful change password'} });
        } catch (err) {
            dispatch(userError(err.response?.data?.msg))
        }

    }
}