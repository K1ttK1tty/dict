import { createSlice } from "@reduxjs/toolkit";
const select = createSlice({
    name: 'select',
    initialState: {
        optionName: 'Choose a theme',
        optionState: { open: false, removeMark: false },
        selectOptions: ['noun', 'verb']
    },
    reducers: {
        setOptionName(state, action) {
            state.optionName = action.payload
        },
        setOptionState(state, action) {
            state.optionState = action.payload
        },
        setSelectOptions(state, action) {
            state.selectOptions = action.payload
        }
    }
})
export default select.reducer
export const { setOptionName, setOptionState, setSelectOptions } = select.actions







