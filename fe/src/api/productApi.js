import instance from "./instanceAxios";

export const searchProductsAPI = (searchString, limit, page) => {
    return instance.get('/product/search', { params: { searchString, limit, page } });
}

export const getsProductsAPI = (filter, limit, page) => {
    return instance.post('/product/filter', filter, { params: { filter, limit, page } });
}

export const createProductAPI = (data) => {
    return instance.post('/product/add', data);
}

export const deleteProductAPI = (id) => {
    return instance.delete('/product/delete/' + id);
}

export const updateProductAPI = (id, data) => {
    return instance.put('/product/update/' + id, data);
}