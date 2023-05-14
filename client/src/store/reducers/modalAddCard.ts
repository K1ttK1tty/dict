import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { isModalAddCardActive: boolean } = {
    isModalAddCardActive: false,
};
const modalAddCard = createSlice({
    name: 'modalAddCard',
    initialState,
    reducers: {
        setIsModalAddCardActive(state, action: PayloadAction<boolean>) {
            state.isModalAddCardActive = action.payload;
        },
    }
});
export default modalAddCard.reducer;
export const { setIsModalAddCardActive } = modalAddCard.actions;