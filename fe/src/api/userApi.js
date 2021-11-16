import instance from "./instanceAxios";

export const login = (loginData) => {
    return instance.post('/auth/login', loginData);
}

export const register = (registerData) => {
    return instance.post('/customer/register', registerData);
}