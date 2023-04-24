import { configureStore, combineReducers } from "@reduxjs/toolkit";

// reducers
import upMenu from "./reducers/upMenu";
import modalRenameCard from "./reducers/modalRenameCard";
import modalAddCard from "./reducers/modalAddCard";
import GamesSlice from "./reducers/GamesSlice";
import ColorPicker from "./reducers/ColorPicker";
import AuthSlice from "./reducers/authorization/Authorization/AuthSlice";

const rootReducer = combineReducers({
    upMenu,
    modalRenameCard,
    modalAddCard,
    GamesSlice,
    ColorPicker,
    AuthSlice,

})


export const store = configureStore({
    reducer: rootReducer
})
