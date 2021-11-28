import instance from "./instanceAxios"

export const createDiscountAPI = (data) => {
    return instance.post('/discount/add', data);
}

export const updateDiscountAPI = (id, data) => {
    return instance.put('/discount/update/' + id, data);
}

export const removeProductDiscountAPI = (productId) => {
    return instance.delete('/discount/remove-product/', { params: { productId } })
}

export const addProductDiscountAPI = (id, products) => {
    return instance.put('/discount/add-products/' + id, { products })
}

export const deleteDiscountAPI = (id) => {
    return instance.delete('/discount/delete/' + id);
}

export const getDiscountsAPI = () => {
    return instance.get('/discount/get-all');
}

export const getDiscountAPI = (id) => {
    return instance.get('/discount/get-discount/' + id);
}

export const getProductDiscountAPI = (id, page, limit, searchString) => {
    return instance.get('/discount/get-products/' + id, { params: { page, limit, searchString } });
}