import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInputValue } from './authorization/Authorization/AuthTypes';
interface IInitialState {
    indexCard: number;
    isModalActive: boolean;
    inputValue: IInputValue;
    editCard: IInputValue;
}
const initialState: IInitialState = {
    indexCard: 0,
    isModalActive: false,
    inputValue: {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: ''
    },
    editCard: {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: ''
    }
};
const modalRenameCard = createSlice({
    name: 'modalRenameCard',
    initialState,
    reducers: {
        setIndexCard(state, action: PayloadAction<number>) {
            state.indexCard = action.payload;
        },
        setModal(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload;
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
export const { setIndexCard, setModal, setInputValue, setEditCard } = modalRenameCard.actions;