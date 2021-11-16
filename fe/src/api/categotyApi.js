import instance from "./instanceAxios";

export const addCatetoryAPI = (data) => {
    return instance.post('/category/add', data);
}

export const deleteCategoryAPI = (id) => {
    return instance.delete('/category/delete/' + id);
}

export const updateCategoryAPI = (id, data) => {
    return instance.put('/category/update/' + id, data);
}

export const getCagtegoriesAPI = () => {
    return instance.get('/category/get-category');
}