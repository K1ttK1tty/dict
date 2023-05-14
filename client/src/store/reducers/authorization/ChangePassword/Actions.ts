import $api from '../../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IEmail {
    email: string;
}
interface IPasswordAndId {
    password: string;
    id: number;
}

export const SendResetPassword = createAsyncThunk(
    'SendResetPassword',
    async (userData: IEmail, thunkAPI) => {
        try {
            const { email } = userData;
            const response = await $api.post('/resetPassword', { email });
            console.log(response);
            return response.data;
        } catch (err) {
            console.log(err);
            console.log(err?.response?.data?.message);
            return thunkAPI.rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const refreshPassword = createAsyncThunk(
    'refreshPassword',
    async (userData: IPasswordAndId, thunkAPI) => {
        try {
            const { id, password } = userData;
            const response = await $api.post('/refreshPassword', { id, password });
            console.log(response);
            return response.data;
        } catch (err) {
            console.log(err);
            console.log(err?.response?.data?.message);
            return thunkAPI.rejectWithValue(err?.response?.data?.message);
        }
    }
);


