import { createSlice } from "@reduxjs/toolkit"
const upMenu = createSlice({
    name: 'upMenu',
    initialState: {
        input: { isOpen: false, after: '' },
        searchWord: '',
    },
    reducers: {
        setSearchWord(state, action) {
            state.searchWord = action.payload
        },
        setInput(state, action) {
            state.input = action.payload
        }
    }


})


export default upMenu.reducer
export const { setSearchWord, setInput } = upMenu.actions