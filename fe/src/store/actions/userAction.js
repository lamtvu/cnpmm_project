import { getInforAPI } from "../../api/userApi";

export const USER_SET = 'USER_SET';
export const USER_REMOVE = 'USER_REMOVE';

export const setUser = (user) => {
    return {
        type: USER_SET,
        payload: user
    }
}

export const getUserAction = () => {
    return async (dispatch) => {
        try {
            const res = await getInforAPI();
            dispatch(setUser(res.data));
        } catch {
            console.log('get info failed');
        }
    }
}