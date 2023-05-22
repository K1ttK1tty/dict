import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from './authorization/Authorization/AuthTypes';
interface IInitialState {
    indexCard: number;
    isModalActive: boolean;
    inputValue: ICard;
    editCard: ICard;
}
const initialState: IInitialState = {
    indexCard: 0,
    isModalActive: false,
    inputValue: {
        id: 0,
        word: '',
        translate: '',
        theme: ''
    },
    editCard: {
        id: 0,
        word: '',
        translate: '',
        theme: ''
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
        setInputValue(state, action: PayloadAction<ICard>) {
            state.inputValue = action.payload;
        },
        setEditCard(state, action: PayloadAction<ICard>) {
            state.editCard = action.payload;
        },
    }
});
export default modalRenameCard.reducer;
export const { setIndexCard, setModal, setInputValue, setEditCard } = modalRenameCard.actions;