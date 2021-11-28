import { combineReducers } from "redux";
import { brandReducer } from "./brandReducer";
import cartMsgReducer from "./cartMsgReducer";
import { categoryReducer } from "./categoryReducer";
import customerReducer from "./customerReducer";
import discountReducer from "./discountReducer";
import messageReducer from "./messageReducer";
import orderReducer from "./orderReducer";
import ProductReducer from "./productReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    categories: categoryReducer,
    brands: brandReducer,
    products: ProductReducer,
    customers: customerReducer,
    orders: orderReducer,
    user: userReducer,
    message: messageReducer,
    discounts: discountReducer,
    cartMsg: cartMsgReducer
})

export default allReducers;