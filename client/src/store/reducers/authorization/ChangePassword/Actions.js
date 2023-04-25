import $api from "../../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SendResetPassword = createAsyncThunk(
    'SendResetPassword',
    async (userData, thunkAPI) => {
        try {
            const { email } = userData;
            const response = await $api.post('/resetPassword', { email })
            console.log(response)
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const refreshPassword = createAsyncThunk(
    'refreshPassword',
    async (userData, thunkAPI) => {
        try {
            const { id, password } = userData;
            const response = await $api.post('/refreshPassword', { id, password })
            console.log(response)
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)






