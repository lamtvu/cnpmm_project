import { applyMiddleware, createStore } from "redux";
import allReducers from "./reducers";
import thunkMiddleware from "redux-thunk";


const store = createStore(allReducers, applyMiddleware(thunkMiddleware));
export default store;