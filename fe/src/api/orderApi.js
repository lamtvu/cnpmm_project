import instance from "./instanceAxios";

export const calculatorAPI = (orders) => {
    return instance.post('/order/calculator', { orders });
}

export const createOrderAPI = (orderDetail) => {
    return instance.post('/order/add', orderDetail);
}

export const getMyOrdersAPI = () => {
    return instance.get('/order/my-orders');
}

export const getAllOrdersAPI = (page, limit, searchString) => {
    return instance.get('/order/get-all', { params: { page, limit, searchString } });
}

export const updateOrderAPI = (id, orderDetail) => {
    return instance.put('/order/update/' + id, orderDetail);
}

export const getOrderByIdAPI = (id) => {
    return instance.get('/order/get-order/' + id);
}