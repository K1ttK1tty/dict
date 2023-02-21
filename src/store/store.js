import { configureStore, combineReducers } from "@reduxjs/toolkit";
import upMenu from "./upMenu";

const rootReducer = combineReducers({
    upMenu: upMenu
})


export const store = configureStore({
    reducer: rootReducer
})
