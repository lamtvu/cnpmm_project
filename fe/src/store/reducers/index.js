import { combineReducers } from "redux";
import { brandReducer } from "./brandReducer";
import { categoryReducer } from "./categoryReducer";
import customerReducer from "./customerReducer";
import orderReducer from "./orderReducer";
import ProductReducer from "./productReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    categories: categoryReducer,
    brands: brandReducer,
    products: ProductReducer,
    customers: customerReducer,
    orders: orderReducer,
    user: userReducer
})

export default allReducers;