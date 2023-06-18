import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IInput {
    isOpen: boolean;
    after: string;
}
interface IInitialState {
    input: IInput;
    searchWord: string;
    isSearchByWord: boolean;
    isLetterCaseInclude: boolean;
}
const initialState: IInitialState = {
    input: { isOpen: false, after: '' },
    searchWord: '',
    isSearchByWord: true,
    isLetterCaseInclude: false
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
        setSearchByWord(state) {
            state.isSearchByWord = !state.isSearchByWord;
        },
        setIsLetterCaseInclude(state) {
            state.isLetterCaseInclude = !state.isLetterCaseInclude;
        }

    }
});
export default upMenu.reducer;
export const { setSearchWord,
    setInput,
    setSearchByWord,
    setIsLetterCaseInclude
} = upMenu.actions;