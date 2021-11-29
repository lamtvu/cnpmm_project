import { getCustomersAPI } from "../../api/userApi";

export const CUSTOMER_GET = 'CUSTOMER_GET';
export const CUSTOMER_REQUEST = 'CUSTOMER_REQUEST';
export const CUSTOMER_ERROR = 'CUSTOMER_ERROR';

const getCustomers = (customers, searchString) => {
    return {
        type: CUSTOMER_GET,
        payload: { customers, searchString }
    }
}

const requestCustomer = () => {
    return {
        type: CUSTOMER_REQUEST
    }
}

const errorCustomer = () => {
    return {
        type: CUSTOMER_ERROR
    }
}

export const getCustomersAction = (searchString, page, limit) => {
    return async (dispatch) => {
        dispatch(requestCustomer());
        try {
            const res = await getCustomersAPI(page, limit, searchString);
            console.log(res.data)
            dispatch(getCustomers(res.data, searchString));
        } catch {
            dispatch(errorCustomer('Error to get customers'));
        }
    }
}