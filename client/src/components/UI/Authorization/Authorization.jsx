import React, { useState } from 'react';
// redux
import { Registration, Login } from '../../../store/reducers/asyncActions/ActionCreator'
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../../store/reducers/authorization/AuthSlice';
const Authorization = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const loginRes = async () => {
        ///////////////// DELETE THIS!!
        if (email === 'admin' && password === 'admin') {
            dispatch(setIsAuth())
            return;
        }
        //////////////////////

        dispatch(Login({ email, password }))
    }

    const regRes = async () => {
        dispatch(Registration({ email, password }))
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="text"
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <button
                type='submit'
                children='Логин'
                onClick={loginRes}
            />
            <button
                type='submit'
                children='Регистрация'
                onClick={regRes}
            />
        </div>
    )
};
export default Authorization;