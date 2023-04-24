import { createSlice } from "@reduxjs/toolkit";
import { SendResetPassword } from "./Actions";

const initialState = {
    email: '',
    isUser: false,
}
export const ChangePasswordSlice = createSlice({
    name: 'ChangePasswordSlice',
    initialState,
    reducers: {
        email: ''
    },

    extraReducers(builder) {
        builder.addCase(SendResetPassword.fulfilled, (state, action) => {
            
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