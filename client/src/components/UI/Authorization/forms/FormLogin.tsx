// libs
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ShowIcon from './Icons/ShowIcon';
// consts
import { regularExpression } from './regularExpression';
// styles
import styles from '../Authorization.module.css';
import inputStyle from '../../ModalAddCards/FormAddCard.module.css';
// redux
import { Login } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import { setIsAuth } from '../../../../store/reducers/authorization/Authorization/AuthSlice';
import { useAppDispatch } from '../../../../hooks/redux';
// types
import { IFormProps, IFormLoginHookArgs } from './FormsTypes';
const FormLogin: FC<IFormProps> = function ({ showPassword, setShowPassword, isLogin }) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormLoginHookArgs>({
        mode: 'onSubmit'
    });
    const dispatch = useAppDispatch();
    const formStyle = isLogin ? styles.form : [styles.form, styles.formHide].join(' ');

    const onSubmit: SubmitHandler<IFormLoginHookArgs> = data => {
        //////////////////// DELETE THIS!!
        if (data.email === 'admin' && data.password === 'admin') {
            dispatch(setIsAuth());
            return;
        }
        //////////////////////  

        const email = data.email;
        const password = data.password;
        dispatch(Login({ email, password }));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formStyle} >
            <h1 className={styles.title}>Вход</h1>
            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>Email
                <InputAddCard
                    type="email"
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    register={{
                        ...register('email', {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: regularExpression,
                                message: 'Введите правильный почтовый адрес'
                            }
                        })
                    }}
                />
                {
                    errors?.email?.message &&
                    <div className={styles.errorMessage}>{errors?.email?.message}</div>
                }

            </label>
            <label className={[styles.passwordLabel, styles.label].join(' ')}>
                <span className={styles.asterisk}>*</span>Password
                <InputAddCard
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    register={{
                        ...register('password', {
                            required: 'Поле обязательно для заполнения',
                            minLength: { value: 4, message: 'Длина пароля не менее 4 символов' }
                        })
                    }}
                />
                <ShowIcon
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    styles={styles}
                />
                {
                    errors?.password?.message &&
                    <div className={styles.errorMessage}>{errors?.password?.message}</div>
                }
            </label>
            <BtnAddCard
                aria={'Вход'}
                dinamicclassname={styles.button}
                children="Вход"
            />
            <Link to="/forgotPassword">
                <p className={styles.forgotPasswd}>Забыли пароль?</p>
            </Link>

        </form>
    );
};
export default FormLogin;