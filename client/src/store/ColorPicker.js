import { createSlice } from "@reduxjs/toolkit";
const ColorPicker = createSlice({
    name: 'ColorPicker',
    initialState: {
        pageTheme:'light',
        colorModeOn: false,
        colorRemoveMode: false,
        getCurrentColorMode: false,
        currentColor: '',
        colorsBeforePaint: [],
    },
    reducers: {
        setPageTheme(state,action){
            state.pageTheme = action.payload
        },
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
        },
        setColorsBeforePaint(state, action) {
            state.colorsBeforePaint = action.payload
        },

    }
})
export default ColorPicker.reducer
export const { setColorModeOn, setColorRemoveMode, setGetCurrentColorMode, setCurrentColor, setColorsBeforePaint,setPageTheme } = ColorPicker.actions