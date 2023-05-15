// libs
import { FC, useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import FormLogin from './forms/FormLogin';
import FormRegistration from './forms/FormRegistration';
import ChangePassword from './ResetPassword/ChangePassword';
// styles
import styles from './Authorization.module.css';
// redux
import { useAppDispatch } from '../../../hooks/redux';
import { Registration, Login } from '../../../store/reducers/authorization/Authorization/ActionCreator';
import { setIsAuth } from '../../../store/reducers/authorization/Authorization/AuthSlice';

const Authorization: FC = memo(function () {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const loginRes: ((a: React.MouseEvent<HTMLElement>) => void) = async (e) => {
        e.preventDefault();
        ///////////////// DELETE THIS!!
        if (email === 'admin' && password === 'admin') {
            dispatch(setIsAuth());
            return;
        }
        //////////////////////
        dispatch(Login({ email, password }));
    };
    const regRes: ((a: React.MouseEvent<HTMLElement>) => void) = async (e) => {
        e.preventDefault();
        dispatch(Registration({ userName, email, password }));
    };
    const buttonLogin = isLogin
        ? [styles.buttonSwitcher, styles.buttonSwitcherActive].join(' ')
        : styles.buttonSwitcher;

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
                    <Route path="/forgotPassword" element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    );
});
export default Authorization;