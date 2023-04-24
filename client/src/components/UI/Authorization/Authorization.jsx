// libs
import React, { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import FormLogin from './forms/FormLogin';
import FormRegistration from './forms/FormRegistration';
import ChangePassword from './ResetPassword/ChangePassword';
// styles
import styles from './Authorization.module.css'
// redux
import { useDispatch } from 'react-redux';
import { Registration,Login } from '../../../store/reducers/authorization/Authorization/ActionCreator';
// import { Registration, Login } from '../../../store/reducers/authorization/Authorization/ActionCreator'
import { setIsAuth } from '../../../store/reducers/authorization//Authorization/AuthSlice';
const Authorization = memo(function () {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();

    const loginRes = async (e) => {
        e.preventDefault();
        ///////////////// DELETE THIS!!
        if (email === 'admin' && password === 'admin') {
            dispatch(setIsAuth())
            return;
        }
        //////////////////////
        dispatch(Login({ email, password }))
    }

    const regRes = async (e) => {
        e.preventDefault()
        dispatch(Registration({ userName, email, password }))
    }
    const buttonLogin = isLogin
        ? [styles.buttonSwitcher, styles.buttonSwitcherActive].join(' ')
        : styles.buttonSwitcher

    const buttonRegistration = isLogin
        ? styles.buttonSwitcher
        : [styles.buttonSwitcher, styles.buttonSwitcherActive].join(' ');

    return (
        <div className={styles.back}>
            <div className={styles.content}>

                <div className={styles.changeActions}>
                    <button onClick={() => setIsLogin(true)} className={buttonLogin}>Вход</button>
                    <button onClick={() => setIsLogin(false)} className={buttonRegistration}>Регистрация</button>
                </div>

                <FormLogin
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    action={loginRes}
                    isLogin={isLogin}
                />
                <FormRegistration
                    userName={userName}
                    setUserName={setUserName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    action={regRes}
                    isLogin={isLogin}
                />

                <Routes>
                    <Route path='/forgotPassword' element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    )
});
export default Authorization;