import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    input: { isOpen: false, after: '' },
    searchWord: '',
    isUserMenuOpen: false
};
const upMenu = createSlice({
    name: 'upMenu',
    initialState: initialState,
    reducers: {
        setSearchWord(state, action) {
            state.searchWord = action.payload;
        },
        setInput(state, action) {
            state.input = action.payload;
        },
        setIsUserMenuOpen(state, action) {
            state.isUserMenuOpen = action.payload;
        }
    }
});
export default upMenu.reducer;
export const { setSearchWord, setInput, setIsUserMenuOpen } = upMenu.actions;