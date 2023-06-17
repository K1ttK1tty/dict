import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IInitialState {
    inputReq: number,
    cardsNumber: number,
    validateArr: string[],
    changer: boolean,
}
const initialState: IInitialState = {
    inputReq: 0,
    cardsNumber: 0,
    validateArr: [],
    changer: false,
};
const GamesSlice = createSlice({
    name: 'Games',
    initialState,
    reducers: {
        setInputReq(state, action: PayloadAction<number>) {
            state.inputReq = action.payload;
        },
        setCardsNumber(state, action: PayloadAction<number>) {
            state.cardsNumber = action.payload;
        },
        setValidateArr(state, action: PayloadAction<string[]>) {
            state.validateArr = action.payload;
        },
        setChanger(state) {
            state.changer = !state.changer;
        }
    }
});
export default GamesSlice.reducer;
export const { setInputReq, setCardsNumber, setValidateArr, setChanger } = GamesSlice.actions;