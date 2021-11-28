export const CARTMSG_OPEN = 'CARTMSG_OPEN';
export const CARTMSG_CLOSE = 'CARTMSG_CLOSE';

const cartMsgOpen = () => {
    return {
        type: CARTMSG_OPEN,
    }
}

export const cartMsgClose = () => {
    return {
        type: CARTMSG_CLOSE
    }
}

export const openCartMsgAction = () => {
    return (dispatch) => {
        dispatch(cartMsgOpen());
        setTimeout(() => {
            dispatch(cartMsgClose());
        }, 2000)
    }
}