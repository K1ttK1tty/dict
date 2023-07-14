import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGamesSliceInitialState } from '../storeModels';
const initialState: IGamesSliceInitialState = {
    inputReq: 0,
    validateArr: [],
};
const GamesSlice = createSlice({
    name: 'Games',
    initialState,
    reducers: {
        setInputReq(state, action: PayloadAction<number>) {
            state.inputReq = action.payload;
        },
        setValidateArr(state, action: PayloadAction<string[]>) {
            state.validateArr = action.payload;
        }
    }
});
export default GamesSlice.reducer;
export const { setInputReq, setValidateArr } = GamesSlice.actions;