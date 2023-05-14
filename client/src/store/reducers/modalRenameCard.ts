import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICards, IChangeCard } from './authorization/Authorization/AuthTypes';
interface IInitialState {
    indexCard: number,
    isModalActive: boolean,
    inputValue: IChangeCard,
    editCard: ICards
}
const initialState: IInitialState = {
    indexCard: 0,
    isModalActive: false,
    inputValue: {
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
        setInputValue(state, action: PayloadAction<IChangeCard>) {
            state.inputValue = action.payload;
        },
        setEditCard(state, action: PayloadAction<ICards>) {
            state.editCard = action.payload;
        },
    }
});
export default modalRenameCard.reducer;
export const { setIndexCard, setModal, setInputValue, setEditCard } = modalRenameCard.actions;