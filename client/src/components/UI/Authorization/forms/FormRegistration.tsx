import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../hooks/redux';

import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
import styles from '../Authorization.module.css';

import { Registration } from '../../../../store/reducers/authorization/Authorization/ActionCreator';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import { IFormProps, IFormRegistrationHookArgs } from './FormsTypes';
import ShowIcon from './Icons/ShowIcon';
import { regularExpression } from './regularExpression';

const FormRegistration: FC<IFormProps> = function ({ showPassword, setShowPassword, isLogin }) {
    const formStyle = isLogin ? [styles.form, styles.formHide].join(' ') : styles.form;
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormRegistrationHookArgs>({ mode: 'onSubmit' });
    const onSubmit: SubmitHandler<IFormRegistrationHookArgs> = data => {
        const email = data.email;
        const userName = data.name;
        const password = data.password;
        dispatch(Registration({ userName, email, password }));
    };
    console.log(errors);

    return (
        <form data-testid="registrationForm" onSubmit={handleSubmit(onSubmit)} className={formStyle}>
            <h1 className={styles.title}>Регистрация</h1>

            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>Name
                <InputAddCard
                    testId="registrationName"
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    register={{
                        ...register('name', {
                            required: 'Поле обязательно для заполнения',
                        }),
                    }}
                />
                {errors?.name?.message && (
                    <div data-testid="formError" className={styles.errorMessage}>
                        {errors?.name?.message}
                    </div>
                )}
            </label>
            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>Email
                <InputAddCard
                    testId="registrationEmail"
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    type="email"
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
                    testId="registrationPassword"
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input, styles.inputPasswd].join(' ')}
                    register={{
                        ...register('password', {
                            required: 'Поле обязательно для заполнения',
                            minLength: { value: 4, message: 'Длина пароля не менее 4 символов' },
                        }),
                    }}
                />
                <ShowIcon showPassword={showPassword} styles={styles} setShowPassword={setShowPassword} />
                {errors?.password?.message && (
                    <div data-testid="formError" className={styles.errorMessage}>
                        {errors?.password?.message}
                    </div>
                )}
            </label>
            <BtnAddCard
                data-testid="registrationBtn"
                aria={'Зарегистрироваться'}
                dinamicclassname={styles.button}
                children="Зарегистрироваться"
            />
        </form>
    );
};
export default FormRegistration;
