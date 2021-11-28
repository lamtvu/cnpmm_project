export const MESSAGE_ON = 'MESSAGE_ON';
export const MESSAGE_OFF = 'MESSAGE_OFF';

const turnOnMesagge = (type, msg) => {
    return {
        type: MESSAGE_ON,
        payload: { type, msg }
    }
}

const turnOffMesagge = () => {
    return {
        type: MESSAGE_OFF,
    }
}

export const turnOnMessageAction = (type, msg) => {
    return (dispatch) => {
        dispatch(turnOnMesagge(type, msg));
        setTimeout(() => {
            dispatch(turnOffMesagge());
        }, 2000);
    }
}