import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IColorPicker } from '../storeModels';

const initialState: IColorPicker = {
    colorModeOn: false,
    colorRemoveMode: false,
    getCurrentColorMode: false,
    currentColor: '',
    colorsBeforePaint: [],
};
const ColorPicker = createSlice({
    name: 'ColorPicker',
    initialState,
    reducers: {
        setColorModeOn(state, action: PayloadAction<boolean>) {
            state.colorModeOn = action.payload;
        },
        setColorRemoveMode(state, action: PayloadAction<boolean>) {
            state.colorRemoveMode = action.payload;
        },
        setGetCurrentColorMode(state, action: PayloadAction<boolean>) {
            state.getCurrentColorMode = action.payload;
        },
        setCurrentColor(state, action: PayloadAction<string>) {
            state.currentColor = action.payload;
        },
        setColorsBeforePaint(state, action: PayloadAction<string[]>) {
            state.colorsBeforePaint = action.payload;
        },
    },
});
export default ColorPicker.reducer;
export const { setColorModeOn, setColorRemoveMode, setGetCurrentColorMode, setCurrentColor, setColorsBeforePaint } =
    ColorPicker.actions;
