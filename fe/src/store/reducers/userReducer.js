import { USER_ERROR, USER_REQUEST, USER_SET } from "../actions/userAction";

const initState = null;

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case USER_SET:
            return {...payload, loading: false, error: null };
        case USER_ERROR:
            console.log(state)
            return { ...state, loading: false, error: payload };
        case USER_REQUEST:
            console.log('loading true')
            return { ...state, loading: true, error: null };
        default:
            return { ...state }
    }
}

export default userReducer