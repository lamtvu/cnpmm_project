import { CARTMSG_CLOSE, CARTMSG_OPEN } from "../actions/cartMsgAction"

const initState = {
    open: false
}

const cartMsgReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case CARTMSG_OPEN:
            return {
                open: true
            }
        case CARTMSG_CLOSE:
            return {
                ...state,
                open: false
            }
        default:
            return { ...state }
    }
}

export default cartMsgReducer