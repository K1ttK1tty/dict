import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';

import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
import styles from '../Authorization.module.css';

import { Login } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import { setIsAuth } from '../../../../store/reducers/authorization/Authorization/AuthSlice';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import { IFormLoginHookArgs, IFormProps } from './FormsTypes';
import ShowIcon from './Icons/ShowIcon';
import { regularExpression } from './regularExpression';

const FormLogin: FC<IFormProps> = function ({ showPassword, setShowPassword, isLogin }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormLoginHookArgs>({ mode: 'onSubmit' });
    const dispatch = useAppDispatch();
    const formStyle = isLogin ? styles.form : [styles.form, styles.formHide].join(' ');
    const onSubmit: SubmitHandler<IFormLoginHookArgs> = data => {
        //////////////// DELETE THIS!!
        if (data.email === 'admin@mail.ru' && data.password === 'admin') {
            dispatch(setIsAuth());
            return;
        }
        ////////////////////// DELETE THIS!!
        const email = data.email;
        const password = data.password;
        dispatch(Login({ email, password }));
    };
    return (
        <form data-testid="loginForm" onSubmit={handleSubmit(onSubmit)} className={formStyle}>
            <h1 className={styles.title}>Вход</h1>
            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>
                Email
                <InputAddCard
                    testId="loginEmailInput"
                    type="email"
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    register={{
                        ...register('email', {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: regularExpression,
                                message: 'Введите правильный почтовый адрес',
                            },
                        }),
                    }}
                />
                {errors?.email?.message && (
                    <div data-testid="formError" className={styles.errorMessage}>
                        {errors?.email?.message}
                    </div>
                )}
            </label>
            <label className={[styles.passwordLabel, styles.label].join(' ')}>
                <span className={styles.asterisk}>*</span>Password
                <InputAddCard
                    testId="loginPasswordInput"
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input, styles.inputPasswd].join(' ')}
                    register={{
                        ...register('password', {
                            required: 'Поле обязательно для заполнения',
                            minLength: { value: 4, message: 'Длина пароля не менее 4 символов' },
                        }),
                    }}
                />
                <ShowIcon showPassword={showPassword} setShowPassword={setShowPassword} styles={styles} />
                {errors?.password?.message && (
                    <div data-testid="formError" className={styles.errorMessage}>
                        {errors?.password?.message}
                    </div>
                )}
            </label>
            <BtnAddCard data-testid="loginBtn" aria={'Вход'} dinamicclassname={styles.button} children="Вход" />
            <Link className={styles.link} to="/forgotPassword">
                <p className={styles.forgotPasswd}>Забыли пароль?</p>
            </Link>
        </form>
    );
};
export default FormLogin;
