import { createSlice } from "@reduxjs/toolkit";
const GamesSlice = createSlice({
    name: 'Games',
    initialState: {
        inputReq: 0,
        cardsNumber: 0,
        validateArr: [],
        changer: false,
    },
    reducers: {
        setInputReq(state, action) {
            state.inputReq = action.payload
        },
        setCardsNumber(state, action) {
            state.cardsNumber = action.payload
        },
        setValidateArr(state, action) {
            state.validateArr = action.payload
        },
        setChanger(state) {
            state.changer = !state.changer
        }
    }
})
export default GamesSlice.reducer
export const { setInputReq, setCardsNumber, setValidateArr, setChanger } = GamesSlice.actions