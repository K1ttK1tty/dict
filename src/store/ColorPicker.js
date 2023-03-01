import { createSlice } from "@reduxjs/toolkit";
const ColorPicker = createSlice({
    name: 'ColorPicker',
    initialState: {
        colorModeOn: false,
        colorRemoveMode: false,
        getCurrentColorMode: false,
        currentColor: '',
    },
    reducers: {
        setColorModeOn(state, action) {
            state.colorModeOn = action.payload
        },
        setColorRemoveMode(state, action) {
            state.colorRemoveMode = action.payload
        },
        setGetCurrentColorMode(state, action) {
            state.getCurrentColorMode = action.payload
        },
        setCurrentColor(state, action) {
            state.currentColor = action.payload
        }

    }
})
export default ColorPicker.reducer
export const { setColorModeOn, setColorRemoveMode, setGetCurrentColorMode, setCurrentColor } = ColorPicker.actions