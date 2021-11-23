import { USER_SET } from "../actions/userAction";

const initState = null;

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case USER_SET:
            return { ...payload };
        default:
            return { ...state }
    }
}

export default userReducer