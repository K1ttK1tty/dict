import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ColorPicker from './reducers/ColorPicker';
import GamesSlice from './reducers/GamesSlice';
import AuthSlice from './reducers/authorization/Authorization/AuthSlice';
import modalRenameCard from './reducers/modalRenameCard';
import upMenu from './reducers/upMenu';

const rootReducer = combineReducers({
    upMenu,
    modalRenameCard,
    GamesSlice,
    ColorPicker,
    AuthSlice,
});
export const setupStore = (initialState = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
