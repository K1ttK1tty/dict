import { createSlice } from "@reduxjs/toolkit";
import {
    Login,
    Registration,
    Logout,
    CheckAuth,
    GetData,
    UpdateCards,
    UpdateThemes,
    UploadAvatar,
    GetAvatar
} from './ActionCreator'
import { reducers } from "./reducers";

const initialState = {
    // authorization
    user: {},
    avatar: '',
    isAuth: false,
    isLoading: false,
    error: '',
    updateError: '',
    // cards
    cards: [],
    changeCard: {
        word: '',
        translate: '',
        theme: ''
    },
    toggleWordsOrder: true,
    // select
    optionName: 'Выбрать тему',
    optionState: { open: false, removeMark: false },
    selectOptions: [],
    chooseTheme: ''
}
export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: reducers,

    extraReducers(builder) {
        //registration
        builder.addCase(Registration.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            // state.isAuth = true; // сомневаюсь
            state.user = action.payload.user
            state.isLoading = false;
        })
        builder.addCase(Registration.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Registration.rejected, (state) => {
            state.isLoading = false;
        })

        //login
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            state.cards = action.payload.userContent.userCards;
            state.selectOptions = action.payload.userContent.userThemes;
            state.isAuth = true;
            state.user = action.payload.user
            state.isLoading = false;
        })
        builder.addCase(Login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Login.rejected, (state, action) => {
            state.isLoading = action.payload;
            state.isLoading = false;

        })

        //logout
        builder.addCase(Logout.fulfilled, (state) => {
            localStorage.removeItem('token')
            state.isAuth = false;
            state.user = {}
        })

        // refresh token
        builder.addCase(CheckAuth.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            state.isAuth = true;
            state.user = action.payload.user
        })

        // get cards 
        builder.addCase(GetData.fulfilled, (state, action) => {
            state.cards = action.payload.userCards;
            state.selectOptions = action.payload.userThemes;
        })

        // update cards
        builder.addCase(UpdateCards.rejected, (state, action) => {
            console.log(action.payload)
            state.updateError = action.payload.userCards;
        })

        // updateThemes
        builder.addCase(UpdateThemes.rejected, (state, action) => {
            console.log(action.payload)
            state.updateError = action.payload.userThemes;
        })
        //  avatar
        builder.addCase(UploadAvatar.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        builder.addCase(GetAvatar.fulfilled, (state, action) => {
            state.avatar = action.payload
        })

    }
})
export default AuthSlice.reducer
export const {
    setIsAuth,
    setCards,
    setID,
    setChangeCard,
    setToggleWordsOrder,
    setOptionName,
    setOptionState,
    setSelectOptions,
    setChooseTheme,
    setAvatar,
} = AuthSlice.actions