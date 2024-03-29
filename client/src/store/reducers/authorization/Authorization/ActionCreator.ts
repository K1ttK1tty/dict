import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import {
    IActivateMailProps,
    ICheckAuth,
    IDataStructure,
    IFetchError,
    ILoginProps,
    IMessage,
    IRegistration,
    IRegistrationProps,
    IUploadAvatar,
} from '../../../storeModels';

// api
import $api, { API_URL } from '../../../../api';

export const Registration = createAsyncThunk('Registration', async (userData: IRegistrationProps, thunkAPI) => {
    try {
        const { userName, email, password } = userData;
        const response = await $api.post<IRegistration>('/registration', { userName, email, password });
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const activateMail = createAsyncThunk('activateMail', async (userData: IActivateMailProps, thunkAPI) => {
    try {
        const { id, email } = userData;
        const response = await $api.post<IMessage>('/sendActivationMail', { email, id });
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const Login = createAsyncThunk('Login', async (userData: ILoginProps, thunkAPI) => {
    try {
        const { email, password } = userData;
        const response = await $api.post<ICheckAuth>('/login', { email, password });
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const Logout = createAsyncThunk('Logout', async (_, thunkAPI) => {
    try {
        const response = await $api.post<IMessage>('/logout');
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const CheckAuth = createAsyncThunk('CheckAuth', async (_, thunkAPI) => {
    try {
        const response = await axios.get<ICheckAuth>(`${API_URL}/refresh`, { withCredentials: true });
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const UploadData = createAsyncThunk(
    'UploadData',
    async (userData: { email: string; data: IDataStructure }, thunkAPI) => {
        const { email, data } = userData;
        try {
            const response = await $api.post<IDataStructure>('/uploadData', { email, data });
            console.log(response);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<IFetchError>;
            console.log(err);
            console.log(err?.response?.data?.message);
            return thunkAPI.rejectWithValue(err?.response?.data?.message);
        }
    },
);
export const GetUserData = createAsyncThunk('GetUserData', async (email: string, thunkAPI) => {
    try {
        const response = await $api.post<IDataStructure>('/getUserData', { email });
        console.log(response);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
});
export const UploadAvatar = createAsyncThunk('UploadAvatar', async (data: IUploadAvatar, thunkAPI) => {
    try {
        const { email, avatar } = data;
        const formData = new FormData();
        formData.append('avatar', avatar);
        await $api.post(`/uploadAvatar?email=${email}`, formData);
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(');
    }
});
export const GetAvatar = createAsyncThunk('GetAvatar', async (data: string, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
        const response: Response = await fetch('http://localhost:5001/api/getAvatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + token,
                withCredentials: 'true',
            },
            body: JSON.stringify({ data }),
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        console.log(response);
        return url;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(');
    }
});
export const RemoveAvatar = createAsyncThunk('RemoveAvatar', async (data: { email: string }, thunkAPI) => {
    try {
        const { email } = data;
        await $api.post('/removeAvatar', { email });
    } catch (error) {
        const err = error as AxiosError<IFetchError>;
        console.log(err);
        console.log(err?.response?.data?.message);
        return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(');
    }
});
