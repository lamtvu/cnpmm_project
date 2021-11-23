import { getCustomersAPI } from "../../api/userApi";

export const CUSTOMER_GET = 'CUSTOMER_GET';
export const CUSTOMER_REQUEST = 'CUSTOMER_REQUEST';
export const CUSTOMER_ERROR = 'CUSTOMER_ERROR';
export const CUSTOMER_NEXTPAGE = 'CUSTOMER_NEXTPAGE';
export const CUSTOMER_ENDPAGE = 'CUSTOMER_ENDPAGE'

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

const nextPage = (customer) => {
    return {
        type: CUSTOMER_NEXTPAGE,
        payload: customer
    }
}

const endPage = () => {
    return {
        type: CUSTOMER_ENDPAGE
    }
}

export const getCustomersAction = (searchString) => {
    return async (dispatch, getState) => {
        dispatch(requestCustomer());
        const { limit } = getState().customers;
        try {
            const res = await getCustomersAPI(0, limit, searchString);
            console.log(res.data)
            dispatch(getCustomers(res.data, searchString));
        } catch {
            dispatch(errorCustomer('Error to get customers'));
        }
    }
}

export const nextPageAction = () => {
    return async (dispatch, getState) => {
        dispatch(requestCustomer());
        const { searchString, limit, page } = getState().customer;
        try {
            const res = await getCustomersAPI(page + 1, limit, searchString);
            if (res.data.length < limit) dispatch(endPage());
            else dispatch(nextPage(res.data));
        } catch {
            dispatch(errorCustomer('Error to get customers'));
        }
    }
}