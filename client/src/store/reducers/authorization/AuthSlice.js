import { createSlice } from "@reduxjs/toolkit";

import { Login, Registration, Logout, CheckAuth, GetData } from '../asyncActions/ActionCreator'

const initialState = {
    user: {},
    isAuth: false,
    isLoading: false,
    error: '',
    cards: []
}
export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,

    /////////////// DELETE THIS
    reducers: {
        setIsAuth(state) {
            state.isAuth = true
        }
    },
    //////////////

    extraReducers(builder) {
        //registration
        builder.addCase(Registration.fulfilled, (state, action) => {
            console.log(action.payload)
            localStorage.setItem('token', action.payload.accessToken)
            // state.isAuth = true;
            state.user = action.payload.user
            state.isLoading = false;
        })
        builder.addCase(Registration.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Registration.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        //login
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken)
            console.log(action.payload.usersCards)
            state.cards = action.payload.usersCards;
            state.isAuth = true;
            state.user = action.payload.user
            console.log(state.cards)
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
        builder.addCase(Logout.fulfilled, (state, action) => {
            localStorage.removeItem('token')
            state.isAuth = false;
            state.user = {}
        })
        // refresh token
        builder.addCase(CheckAuth.fulfilled, (state, action) => {

            localStorage.setItem('token', action.payload.accessToken)
            console.log(action.payload)
            state.cards = action.payload.usersCards;
            state.isAuth = true;
            state.user = action.payload.user
            console.log(state.cards)

        })

        // get cards
        builder.addCase(GetData.fulfilled, (state, action) => {
            console.log(action.payload)
            state.cards = action.payload;
        })

    }
})
export default AuthSlice.reducer
export const { setIsAuth } = AuthSlice.actions

