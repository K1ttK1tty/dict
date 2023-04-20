import $api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../api";
import axios from "axios";

export const Registration = createAsyncThunk(
    'Registration',
    async (userData, thunkAPI) => {
        try {
            const { userName, email, password } = userData;
            const response = await $api.post('/registration', { userName, email, password })
            console.log(response)
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const Login = createAsyncThunk(
    'Login',
    async (userData, thunkAPI) => {
        try {
            const { email, password } = userData;
            const response = await $api.post('/login', { email, password });
            console.log(response.data)
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const Logout = createAsyncThunk(
    'Logout',
    async (_, thunkAPI) => {
        try {
            const response = await $api.post('/logout');
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const CheckAuth = createAsyncThunk(
    'CheckAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            console.log(response.data)
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const GetData = createAsyncThunk(
    'GetData',
    async (email, thunkAPI) => {
        try {
            const response = await $api.post('/getData', { email })
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const UpdateCards = createAsyncThunk(
    'UpdateCards',
    async (data, thunkAPI) => {
        try {
            const { email, cards } = data;
            const response = await $api.post('/updateCards', { email, cards })
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)

export const UpdateThemes = createAsyncThunk(
    'UpdateThemes',
    async (data, thunkAPI) => {
        // console.log(data)
        try {
            const { email, themes } = data;
            const response = await $api.post('/updateTheme', { email, themes })
            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)


export const UploadAvatar = createAsyncThunk(
    'UploadAvatar',
    async (data, thunkAPI) => {

        try {
            const { email, avatar } = data;
            // console.log(avatar)
            const formData = new FormData()
            formData.append('avatar', avatar)
            const response = await $api.post(`/uploadAvatar?email=${email}`, formData)
            // const newData = JSON.parse(JSON.stringify(response.data))
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob)


            return response.data
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }
)


export const GetAvatar = createAsyncThunk(
    'GetAvatar',
    async (data, thunkAPI) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:5001/api/getAvatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer ' + token,
                    withCredentials: true
                },
                body: JSON.stringify({data})
            })
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            return url
        } catch (err) {
            console.log(err)
            console.log(err?.response?.data?.message)
            return thunkAPI.rejectWithValue('Произошла ошибка при запросе на сервер :(')
        }
    }

)