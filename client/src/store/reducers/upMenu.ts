import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IInput {
    isOpen: boolean;
    after: string;
}
interface IInitialState {
    input: IInput;
    searchWord: string;
    isUserMenuOpen: boolean;
}
const initialState: IInitialState = {
    input: { isOpen: false, after: '' },
    searchWord: '',
    isUserMenuOpen: false
};
const upMenu = createSlice({
    name: 'upMenu',
    initialState: initialState,
    reducers: {
        setInput(state, action: PayloadAction<IInput>) {
            state.input = action.payload;
        },
        setSearchWord(state, action: PayloadAction<string>) {
            state.searchWord = action.payload;
        },
        setIsUserMenuOpen(state, action: PayloadAction<boolean>) {
            state.isUserMenuOpen = action.payload;
        }
    }
});
export default upMenu.reducer;
export const { setSearchWord, setInput, setIsUserMenuOpen } = upMenu.actions;