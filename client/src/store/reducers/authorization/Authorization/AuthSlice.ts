import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
} from './ActionCreator';
import { SendResetPassword, refreshPassword } from '../ChangePassword/Actions';
import { reducers } from './reducers';

export interface ICards {
    id: number;
    theme: string;
    translate: string;
    word: string;
}
interface IUser {
    id: number;
    name: string;
    email: string;
    isActivated: boolean;
}
interface IChangeCard {
    word: string;
    translate: string;
    theme: string;
}
interface IOptionState {
    open: boolean;
    removeMark: boolean;
}

interface IInitialState {
    user: IUser | Record<string, never>;
    avatar: string;
    isAuth: boolean;
    isLoading: boolean;
    updateError: string;
    cards: ICards[] | [];
    changeCard: IChangeCard;
    toggleWordsOrder: boolean;
    optionName: string;
    optionState: IOptionState;
    selectOptions: string[];
    chooseTheme: string;
    serverMessage: string;
}

const initialState: IInitialState = {
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
    optionName: 'Тема',
    optionState: { open: false, removeMark: false },
    selectOptions: [],
    chooseTheme: '',
    // servers response
    serverMessage: '',
};
export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: reducers,

    extraReducers(builder) {
        //registration
        builder.addCase(Registration.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken);

            const isActivated = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = isActivated;
            state.isLoading = false;
            state.serverMessage = action.payload.message;
        });
        builder.addCase(Registration.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(Registration.rejected, (state, action) => {
            state.isLoading = false;
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            console.log(action.payload);
            const Errorresponse = action.payload as string;
            state.serverMessage = Errorresponse;
        });
        // send activation mail
        builder.addCase(activateMail.fulfilled, (state, action) => {
            state.serverMessage = action.payload.message;
        });
        builder.addCase(activateMail.rejected, (state, action) => {

            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            const Errorresponse = action.payload as string;
            state.serverMessage = Errorresponse;
        });

        //login
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken);
            console.log(action.payload);
            state.cards = action.payload.userContent.userCards;
            state.selectOptions = action.payload.userContent.userThemes;
            state.isAuth = true;
            const isActivated = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = isActivated;
            state.isLoading = false;
            state.serverMessage = action.payload.message;
        });
        builder.addCase(Login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(Login.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            const Errorresponse = action.payload as string;
            state.serverMessage = Errorresponse;
        });

        //logout
        builder.addCase(Logout.fulfilled, (state, action) => {
            localStorage.removeItem('token');
            state.isAuth = false;
            state.user = {};
            state.serverMessage = action.payload.message;
        });

        // refresh token
        builder.addCase(CheckAuth.fulfilled, (state, action) => {
            console.log(action.payload);
            localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            const isActivated = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = isActivated;
            state.serverMessage = action.payload.message;
        });

        // get cards 
        builder.addCase(GetData.fulfilled, (state, action) => {
            state.cards = action.payload.userCards;
            state.selectOptions = action.payload.userThemes;
        });

        builder.addCase(GetAvatar.fulfilled, (state, action) => {
            console.log(action.payload);
            state.avatar = action.payload;
        });


        // change password
        builder.addCase(SendResetPassword.fulfilled, (state, action) => {
            state.serverMessage = action.payload.message;
        });
        builder.addCase(SendResetPassword.rejected, (state, action) => {
            console.log(action.payload);
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            const Errorresponse = action.payload as string;
            state.serverMessage = Errorresponse;
        });
        // refresh password
        builder.addCase(refreshPassword.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            state.user = action.payload.user;
            state.serverMessage = action.payload.message;
        });
        builder.addCase(refreshPassword.rejected, (state, action) => {
            if (!action.payload) {
                state.serverMessage = 'Произошла ошибка при запросе на сервер :(';
                return;
            }
            const Errorresponse = action.payload as string;
            state.serverMessage = Errorresponse;
        });
    }
});
export default AuthSlice.reducer;
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
} = AuthSlice.actions;