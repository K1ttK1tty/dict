import { createSlice } from "@reduxjs/toolkit";
const modalRenameCard = createSlice({
    name: 'modalRenameCard',
    initialState: {
        indexCard: 0,
        isModalActive: false,
        inputValue: {
            word: '',
            translate: '',
            theme: ''
        },
        editCard: {
            id:0,
            word: '',
            translate: '',
            theme: ''
        },
    },
    reducers: {
        setIndexCard(state, action) {
            state.indexCard = action.payload
        },
        setModal(state, action) {
            state.isModalActive = action.payload
        },
        setInputValue(state, action) {
            state.inputValue = action.payload
        },
        setEditCard(state, action) {
            state.inputValue = action.payload
        },
    }
})
export default modalRenameCard.reducer
export const { setIndexCard, setModal, setInputValue, setEditCard } = modalRenameCard.actions

