import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICard, IDataStructure } from '../../../storeModels';

import { SendResetPassword, refreshPassword } from '../ChangePassword/Actions';
import { CheckAuth, GetAvatar, GetUserData, Login, Logout, Registration, activateMail } from './ActionCreator';
import { initialState } from './State';

export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        /////////////// DELETE THIS !  🠗🠗🠗
        setIsAuth(state) {
            state.isAuth = true;
        },
        ////////////// DELETE THIS !   🠕🠕🠕
        changeDictionary(state, action: PayloadAction<string>) {
            if (state.data[action.payload]) {
                state.cards = state.data[action.payload].cards;
                state.selectOptions = state.data[action.payload].selectOptions;
            } else {
                state.cards = [];
                state.selectOptions = [];
            }
        },
        setCurrentDictionary(state, action: PayloadAction<string>) {
            state.currentDictionary = action.payload;
        },
        setData(state, action: PayloadAction<IDataStructure>) {
            state.data = action.payload;
        },
        // cards
        setCards(state, action: PayloadAction<ICard[]>) {
            state.cards = action.payload;
        },
        setID(state) {
            state.cards.map((card, index) => {
                card.id = index + 1;
                return card;
            });
        },
        setChangeCard(state, action: PayloadAction<ICard>) {
            state.changeCard = action.payload;
        },
        setSelectOptions(state, action: PayloadAction<string[]>) {
            state.selectOptions = action.payload;
        },
        setSelectedTheme(state, action: PayloadAction<string>) {
            state.selectedTheme = action.payload;
        },

        // avatar
        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
        },
        // servers response
        setServerMessage(state, action: PayloadAction<string>) {
            state.serverMessage = action.payload;
        },
    },
    extraReducers(builder) {
        //registration
        builder.addCase(Registration.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.userData.accessToken);
            const userInfo = { ...action.payload.userData.user, isActivated: false };
            state.user = userInfo;
            state.isLoading = false;
            state.serverMessage = action.payload.message;
        });
        builder.addCase(Registration.pending, state => {
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
            state.isAuth = true;
            const userInfo = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = userInfo;
            state.isLoading = false;
            state.serverMessage = action.payload.message;
        });
        builder.addCase(Login.pending, state => {
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
            state.user = { id: 0, name: '', email: '', isActivated: false, registrationDate: '' };
            state.serverMessage = action.payload.message;
            state.currentDictionary = 'default';
        });
        // refresh token
        builder.addCase(CheckAuth.fulfilled, (state, action) => {
            console.log(action.payload);
            localStorage.setItem('token', action.payload.accessToken);
            state.isAuth = true;
            const userInfo = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = userInfo;
            state.serverMessage = action.payload.message;
        });
        // upload user data
        builder.addCase(GetUserData.fulfilled, (state, action) => {
            const dictionaryInStorage = localStorage.getItem('currentDictionary');
            if (dictionaryInStorage) {
                const dictionaryWithoutQuotes = JSON.parse(dictionaryInStorage);
                if (action.payload[dictionaryWithoutQuotes]) {
                    state.currentDictionary = dictionaryWithoutQuotes;
                    state.cards = action.payload[dictionaryWithoutQuotes].cards;
                    state.selectOptions = action.payload[dictionaryWithoutQuotes].selectOptions;
                } else {
                    state.cards = [];
                    state.selectOptions = [];
                }
            } else {
                state.cards = action.payload.default.cards;
                state.selectOptions = action.payload.default.selectOptions;
            }
            console.log(action.payload);
            state.data = action.payload;
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
            const userInfo = { ...action.payload.user, isActivated: !!action.payload.user.isActivated };
            state.user = userInfo;
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
    },
});
export default AuthSlice.reducer;
export const {
    setIsAuth,
    setCards,
    setID,
    setChangeCard,
    setSelectOptions,
    setSelectedTheme,
    setAvatar,
    setServerMessage,
    setCurrentDictionary,
    setData,
    changeDictionary,
} = AuthSlice.actions;
