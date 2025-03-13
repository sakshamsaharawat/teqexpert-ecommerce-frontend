import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "../src/State/Auth/Reducer";
import { thunk } from "redux-thunk";
import { productReducer } from "./State/AddTask/Reducer";

const rootReducers = combineReducers({
    authReducer,
    productReducer
})
export type RootState = ReturnType<typeof rootReducers>;
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));