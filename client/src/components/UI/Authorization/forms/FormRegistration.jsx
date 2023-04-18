import React from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// icons
import IconShow from './../icons/IconShow';
import IconHide from './../icons/IconHide';
// styles
import styles from '../Authorization.module.css'
import inputStyle from '../../ModalAddCards/FormAddCard.module.css'
const FormRegistration = function ({
    userName,
    setUserName,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    password,
    setPassword,
    action,
    isLogin
}) {
    const formStyle= isLogin ? [styles.form,styles.formHide].join(' ') : styles.form

    return (
        <form className={formStyle} >
            <h1 className={styles.title}>Регистрация</h1>
            <label> Имя или никнейм
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={userName}
                    setValue={e => setUserName(e)}
                />
            </label>
            <label> email
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={email}
                    setValue={e => setEmail(e)}
                />
            </label>
            <label className={styles.passwordLabel}> password
                <InputAddCard
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={password}
                    setValue={e => setPassword(e)}
                />

                {showPassword
                    ? <IconHide
                        setShowPassword={setShowPassword}
                        style={styles.iconStyle}
                    />

                    : < IconShow
                        setShowPassword={setShowPassword}
                        style={styles.iconStyle}
                    />
                }

            </label>

            <BtnAddCard
                aria={'Зарегистрироваться'}
                dinamicclassname={styles.button}
                children='Зарегистрироваться'
                onClick={action}
            />

        </form>
    )
};
export default FormRegistration;