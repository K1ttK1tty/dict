import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './Authorization.module.css';

import ChangePassword from './ResetPassword/ChangePassword';
import FormLogin from './forms/FormLogin';
import FormRegistration from './forms/FormRegistration';

const Authorization: FC = function () {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const buttonLogin = isLogin
        ? [styles.buttonSwitcher, styles.buttonSwitcherActive].join(' ')
        : styles.buttonSwitcher;
    const buttonRegistration = isLogin
        ? styles.buttonSwitcher
        : [styles.buttonSwitcher, styles.buttonSwitcherActive].join(' ');
    return (
        <div data-testid="authorization" className={styles.back}>
            <div className={styles.content}>
                <div className={styles.changeActions}>
                    <button onClick={() => setIsLogin(true)} className={buttonLogin}>
                        Вход
                    </button>
                    <button onClick={() => setIsLogin(false)} className={buttonRegistration}>
                        Регистрация
                    </button>
                </div>
                <FormLogin showPassword={showPassword} setShowPassword={setShowPassword} isLogin={isLogin} />
                <FormRegistration showPassword={showPassword} setShowPassword={setShowPassword} isLogin={isLogin} />
                <Routes>
                    <Route path="/forgotPassword" element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    );
};
export default Authorization;
