// instance of axios
import $api from '../../../../api';
// redux
import { createAsyncThunk } from '@reduxjs/toolkit';
// types
import { IFetchError, IMessage, ILogin, IEmail } from '../Authorization/AuthTypes';
import { AxiosError } from 'axios';
interface IRefreshPassword {
    password: string;
    id: string | null;
}
export const SendResetPassword = createAsyncThunk(
    'SendResetPassword',
    async (userData: IEmail, thunkAPI) => {
        try {
            const { email } = userData;
            const response = await $api.post<IMessage>('/resetPassword', { email });
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<IFetchError>;
            console.log(err);
            console.log(err?.response?.data?.message);
            return thunkAPI.rejectWithValue(err?.response?.data?.message);
        }
    }
);
export const refreshPassword = createAsyncThunk(
    'refreshPassword',
    async (userData: IRefreshPassword, thunkAPI) => {
        try {
            const { id, password } = userData;
            const response = await $api.post<ILogin>('/refreshPassword', { id, password });
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<IFetchError>;
            console.log(err);
            console.log(err?.response?.data?.message);
            return thunkAPI.rejectWithValue(err?.response?.data?.message);
        }
    }
);