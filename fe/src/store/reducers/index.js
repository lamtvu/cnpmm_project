import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";

const allReducers = combineReducers({
    categories: categoryReducer
})

export default allReducers;