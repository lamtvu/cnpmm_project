import { createOrderAPI, getAllOrdersAPI, getMyOrdersAPI, updateOrderAPI } from "../../api/orderApi";
import { createBrowserHistory } from 'history'

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const MYORDER_SUCCESS = 'MYORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

const requestOrder = () => {
    return {
        type: ORDER_REQUEST,
    }
}

const orderSuccess = (orders, searchString, limit) => {
    return {
        type: ORDER_SUCCESS,
        payload: { ...orders, searchString, limit }
    }
}

const myOrderSuccess = (orders) => {
    return {
        type: MYORDER_SUCCESS,
        payload: orders
    }
}

const orderError = (error) => {
    return {
        type: ORDER_ERROR,
        payload: error
    }
}

export const getOrdersAction = (searchString, page, limit) => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            const res = await getAllOrdersAPI(page, limit, searchString);
            dispatch(orderSuccess(res.data, searchString, limit));
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
            dispatch(myOrderSuccess(res.data));
        } catch (err) {
            dispatch(orderError('orders load failed'));
        }
    }
}

export const createOrderAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(requestOrder());
        try {
            const res = await createOrderAPI(data);
            dispatch(getMyOrdersAction());
            localStorage.removeItem('orderProducts');
            navigate('/user/order-detail/' + res.data._id, {state: {msg: 'Successful Order, Thank you for your orders'}})
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