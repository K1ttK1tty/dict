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
    GetAvatar,
    activateMail
} from './ActionCreator'
import { SendResetPassword, refreshPassword } from "../ChangePassword/Actions";
import { reducers } from "./reducers";

const initialState = {
    // authorization
    user: {},
    avatar: '',
    isAuth: false,
    isLoading: false,
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
    chooseTheme: '',
    // servers response
    serverMessage: '',

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
            state.serverMessage = action.payload.message
        })
        builder.addCase(Registration.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Registration.rejected, (state, action) => {
            state.isLoading = false;
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            state.serverMessage = action.payload;
        })
        // send activation mail
        builder.addCase(activateMail.fulfilled, (state, action) => {
            state.serverMessage = action.payload.message
        })
        builder.addCase(activateMail.rejected, (state, action) => {

            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            state.serverMessage = action.payload;
        })

        //login
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            state.cards = action.payload.userContent.userCards;
            state.selectOptions = action.payload.userContent.userThemes;
            state.isAuth = true;
            state.user = action.payload.user
            state.isLoading = false;
            state.serverMessage = action.payload.message
        })
        builder.addCase(Login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Login.rejected, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            state.serverMessage = action.payload;
        })

        //logout
        builder.addCase(Logout.fulfilled, (state, action) => {
            localStorage.removeItem('token')
            state.isAuth = false;
            state.user = {}
            state.serverMessage = action.payload.message
        })

        // refresh token
        builder.addCase(CheckAuth.fulfilled, (state, action) => {
            console.log(action.payload)
            localStorage.setItem('token', action.payload.accessToken)
            state.isAuth = true;
            state.user = action.payload.user
            state.serverMessage = action.payload.message
        })

        // get cards 
        builder.addCase(GetData.fulfilled, (state, action) => {
            state.cards = action.payload.userCards;
            state.selectOptions = action.payload.userThemes;
        })

        // // update cards
        // builder.addCase(UpdateCards.rejected, (state, action) => {
        //     console.log(action.payload)
        //     state.updateError = action.payload.userCards;
        // })

        // // updateThemes
        // builder.addCase(UpdateThemes.rejected, (state, action) => {
        //     console.log(action.payload)
        //     state.updateError = action.payload.userThemes;
        // })
        // //  avatar
        // builder.addCase(UploadAvatar.fulfilled, (state, action) => {
        //     console.log(action.payload)
        // })

        builder.addCase(GetAvatar.fulfilled, (state, action) => {
            console.log(action.payload)
            state.avatar = action.payload
        })


        // change password
        builder.addCase(SendResetPassword.fulfilled, (state, action) => {
            state.serverMessage = action.payload.message;
        })
        builder.addCase(SendResetPassword.rejected, (state, action) => {
            console.log(action.payload)
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            state.serverMessage = action.payload;
        })
        // refresh password
        builder.addCase(refreshPassword.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            state.isAuth = true;
            state.user = action.payload.user
            state.serverMessage = action.payload.message
        })
        builder.addCase(refreshPassword.rejected, (state, action) => {
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            state.serverMessage = action.payload;
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
    setServerMessage,
} = AuthSlice.actions