import { createSlice } from "@reduxjs/toolkit";

const ColorPicker = createSlice({
    name: 'ColorPicker',
    initialState: {
        colorModeOn: false,
        colorRemoveMode: false,

    },
    reducers: {
        setColorModeOn(state, action) {
            state.colorModeOn = action.payload
        },
        setColorRemoveMode(state, action) {
            state.colorRemoveMode = action.payload
        },

    }
})
export default ColorPicker.reducer
export const { setColorModeOn, setColorRemoveMode } = ColorPicker.actions





