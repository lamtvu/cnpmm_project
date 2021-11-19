import instance from "./instanceAxios";

export const addBrandAPI = (data) => {
    return instance.post('/producer/add', data);
}

export const deleteBrandAPI = (id) => {
    return instance.delete('/producer/delete/' + id);
}

export const updateBrandAPI = (id, data) => {
    return instance.put('/producer/update/' + id, data);
}

export const getBrandsAPI = () => {
    return instance.get('/producer/get-all');
}