import { createSlice } from "@reduxjs/toolkit";
const modalAddCard = createSlice({
    name: 'modalAddCard',
    initialState: {
        isModalAddCardActive: false,
    },
    reducers: {
        setIsModalAddCardActive(state, action) {
            state.isModalAddCardActive = action.payload
        },
    }
})
export default modalAddCard.reducer
export const {setIsModalAddCardActive} = modalAddCard.actions