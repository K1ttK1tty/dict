import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInputValue } from '../storeModels';
import { IModalRenameCardInitialState } from '../storeModels';
const initialState: IModalRenameCardInitialState = {
    indexCard: 0,
    inputValue: {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: '',
        favorite: false
    },
    editCard: {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: '',
        favorite: false,
    }
};
const modalRenameCard = createSlice({
    name: 'modalRenameCard',
    initialState,
    reducers: {
        setIndexCard(state, action: PayloadAction<number>) {
            state.indexCard = action.payload;
        },
        setInputValue(state, action: PayloadAction<IInputValue>) {
            state.inputValue = action.payload;
        },
        setEditCard(state, action: PayloadAction<IInputValue>) {
            state.editCard = action.payload;
        },
    }
});
export default modalRenameCard.reducer;
export const { setIndexCard, setInputValue, setEditCard } = modalRenameCard.actions;