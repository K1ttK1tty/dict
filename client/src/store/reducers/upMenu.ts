import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IInput, IUpMenuInitialState } from '../storeModels';

const initialState: IUpMenuInitialState = {
    input: { isOpen: false, after: '' },
    searchWord: '',
    isSearchByWord: true,
    isLetterCaseInclude: false,
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
        },
    },
});
export default upMenu.reducer;
export const { setSearchWord, setInput, setSearchByWord, setIsLetterCaseInclude } = upMenu.actions;
