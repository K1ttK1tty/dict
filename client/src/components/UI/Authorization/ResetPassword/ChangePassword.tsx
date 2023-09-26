import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';

import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
import stylesAuth from '../Authorization.module.css';
import styles from './ResetPassword.module.css';

import { SendResetPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import { IChangePassword } from '../forms/FormsTypes';
import { regularExpression } from '../forms/regularExpression';

const ChangePassword: FC = function () {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePassword>({ mode: 'onSubmit' });
    const onSubmit: SubmitHandler<IChangePassword> = data => {
        const email = data.email;
        dispatch(SendResetPassword({ email }));
    };
    return (
        <div className={stylesAuth.back}>
            <div className={[stylesAuth.content, styles.content].join(' ')}>
                <Link data-testid="backToLoginPage" to="/">
                    <div className={styles.icon}>
                        <div className={styles.arrow}></div>
                    </div>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className={[stylesAuth.form, styles.form].join(' ')}>
                    <h1 className={[styles.title].join(' ')}>Смена пароля</h1>
                    <p className={styles.info}>На почту придет письмо с инструкцией по смене пароля*</p>

                    <label className={stylesAuth.passwordLabel}>
                        <span className={stylesAuth.asterisk}>*</span>Email
                        <InputAddCard
                            testId="inputChangePasswordPage"
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
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
                            <div className={stylesAuth.errorMessage}>{errors?.email?.message}</div>
                        )}
                    </label>
                    <BtnAddCard aria="Отправить" dinamicclassname={stylesAuth.button} children="Отправить" />
                </form>
            </div>
        </div>
    );
};
export default ChangePassword;
