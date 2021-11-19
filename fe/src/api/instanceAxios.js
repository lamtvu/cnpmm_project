import axios from "axios";
import { Cookies } from 'react-cookie';

const baseURL = process.env.baseURL || 'http://localhost:3002/api/'

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
    const auth = new Cookies().get('auth');
    if (auth) {
        config.headers['Authorization'] = `Bearer ${auth.token}`;
        return config;
    }
    return config;
})

export default instance;