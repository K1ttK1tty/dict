import { configureStore, combineReducers } from '@reduxjs/toolkit';
// reducers
import upMenu from './reducers/upMenu';
import modalRenameCard from './reducers/modalRenameCard';
import modalAddCard from './reducers/modalAddCard';
import GamesSlice from './reducers/GamesSlice';
import ColorPicker from './reducers/ColorPicker';
import AuthSlice from './reducers/authorization/Authorization/AuthSlice';

const rootReducer = combineReducers({
    upMenu,
    modalRenameCard,
    modalAddCard,
    GamesSlice,
    ColorPicker,
    AuthSlice,
});
export const setupStore = (initialState = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    });
};
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']