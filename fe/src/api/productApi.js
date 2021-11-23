import instance from "./instanceAxios";

export const searchProductsAPI = (searchString, limit, page) => {
    return instance.get('/product/search', { params: { searchString, limit, page } });
}

export const getProductsAPI = (filter, limit, page) => {
    return instance.post('/product/get', filter, { params: { limit, page } });
}

export const createProductAPI = (data) => {
    return instance.post('/product/add', data);
}

export const getProductAPI = (id) => {
    return instance.get('/product/get-product/' + id);
}

export const deleteProductAPI = (id) => {
    return instance.delete('/product/delete/' + id);
}

export const updateProductAPI = (id, data) => {
    return instance.put('/product/update/' + id, data);
}