import { MESSAGE_OFF, MESSAGE_ON } from "../actions/messageAction"

const initState = {
    msg: '',
    type: null,
    open: false,
}

const messageReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case MESSAGE_ON:
            return {
                type: payload.type,
                msg: payload.msg,
                open: true
            }
        case MESSAGE_OFF:
            return {
                ...state,
                open: false
            }
        default:
            return { ...state }
    }
}

export default messageReducer