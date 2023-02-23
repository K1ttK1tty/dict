import { configureStore, combineReducers } from "@reduxjs/toolkit";
import upMenu from "./upMenu";
import modalRenameCard from "./modalRenameCard";
import modalAddCard from "./modalAddCard";
import select from "./select";

const rootReducer = combineReducers({
    upMenu: upMenu,
    modalRenameCard: modalRenameCard,
    modalAddCard:modalAddCard,
    select:select,


})


export const store = configureStore({
    reducer: rootReducer
})
