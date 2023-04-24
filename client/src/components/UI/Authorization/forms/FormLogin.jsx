import React from 'react';
import { Link } from 'react-router-dom';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ShowIcon from './Icons/ShowIcon';
// styles
import styles from '../Authorization.module.css'
import inputStyle from '../../ModalAddCards/FormAddCard.module.css'
const FormLogin = function
    ({
        email,
        setEmail,
        showPassword,
        setShowPassword,
        password,
        setPassword,
        action,
        isLogin
    }) {
    const formStyle = isLogin ? styles.form : [styles.form, styles.formHide].join(' ')

    return (
        <form className={formStyle} >
            <h1 className={styles.title}>Вход</h1>
            <label> email
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={email}
                    setValue={e => setEmail(e)}
                    type='email'
                />
            </label>
            <label className={styles.passwordLabel}> password
                <InputAddCard
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={password}
                    setValue={e => setPassword(e)}
                />
                <ShowIcon
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    styles={styles}
                />
            </label>

            <BtnAddCard
                aria={'Вход'}
                dinamicclassname={styles.button}
                children='Вход'
                onClick={action}
            />

            <Link to="/forgotPassword">
                <p className={styles.forgotPasswd}>Забыли пароль?</p>
            </Link>

        </form>
    )
};
export default FormLogin;