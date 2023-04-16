import { createSlice } from "@reduxjs/toolkit";
import {
    Login,
    Registration,
    Logout,
    CheckAuth,
    GetData,
    UpdateCards,
    UpdateThemes
} from '../asyncActions/ActionCreator'

const initialState = {
    user: {},
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
    optionName: 'Choose a theme',
    optionState: { open: false, removeMark: false },
    selectOptions: [],
    chooseTheme: ''
}
export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,


    reducers: {
        /////////////// DELETE THIS !
        setIsAuth(state) {
            state.isAuth = true
        },
        //////////////

        // cards
        setCards(state, action) {
            state.cards = action.payload
        },
        setID(state) {
            state.cards.map((card, index) => {
                card.id = index + 1
            })
        },
        setChangeCard(state, action) {
            state.changeCard = action.payload
        },
        setToggleWordsOrder(state) {
            state.toggleWordsOrder = !state.toggleWordsOrder
        },
        // select
        setOptionName(state, action) {
            state.optionName = action.payload
        },
        setOptionState(state, action) {
            state.optionState = action.payload
        },
        setSelectOptions(state, action) {
            state.selectOptions = action.payload
        },
        setChooseTheme(state, action) {
            state.chooseTheme = action.payload
        }
    },


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
        builder.addCase(Registration.rejected, (state, action) => {
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
        builder.addCase(Logout.fulfilled, (state, action) => {
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
    setChooseTheme
} = AuthSlice.actions