import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IInitialState {
    inputReq: number,
    validateArr: string[],
}
const initialState: IInitialState = {
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