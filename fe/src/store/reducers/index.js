import { combineReducers } from "redux";
import { brandReducer } from "./brandReducer";
import { categoryReducer } from "./categoryReducer";

const allReducers = combineReducers({
    categories: categoryReducer,
    brands: brandReducer
})

export default allReducers;