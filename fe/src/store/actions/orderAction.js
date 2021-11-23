import { createOrderAPI, getAllOrdersAPI, getMyOrdersAPI, updateOrderAPI } from "../../api/orderApi";
import { createBrowserHistory } from 'history'

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

const requestOrder = () => {
    return {
        type: ORDER_REQUEST,
    }
}

const orderSuccess = (orders) => {
    return {
        type: ORDER_SUCCESS,
        payload: orders
    }
}

const orderError = (error) => {
    return {
        type: ORDER_ERROR,
        payload: error
    }
}

export const getOrdersAction = () => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            const res = await getAllOrdersAPI();
            dispatch(orderSuccess(res.data));
        } catch (err) {
            dispatch(orderError('orders load failed'));
        }
    }
}

export const getMyOrdersAction = () => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            const res = await getMyOrdersAPI();
            dispatch(orderSuccess(res.data));
        } catch (err) {
            dispatch(orderError('orders load failed'));
        }
    }
}

export const createOrderAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            await createOrderAPI(data);
            dispatch(getMyOrdersAction());
            localStorage.removeItem('orderProducts');
            navigate('/user/my-orders')
        } catch (err) {
            dispatch(orderError('orders load failed'));
        }
    }
}

export const updateOrderAction = (id, data) => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            await updateOrderAPI(id, data);
            dispatch(getOrdersAction());
        } catch (err) {
            dispatch(orderError('orders load failed'));
        }
    }
}