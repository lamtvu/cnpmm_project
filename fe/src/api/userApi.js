import instance from "./instanceAxios";

export const login = (loginData) => {
    return instance.post('/auth/login', loginData);
}

export const getCustomersAPI = (page, limit, searchString) => {
    return instance.get('/customer', { params: { page, limit, searchString } });
}

export const getInforAPI = () => {
    return instance.get('/customer/info');
}

export const register = (registerData) => {
    return instance.post('/customer/register', registerData);
}

export const changeInfoAPI = (data) => {
    return instance.put('/customer/info', data);
}

export const changePasswordAPI = (data) => {
    return instance.put('/customer/password', data);
}