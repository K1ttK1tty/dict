import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ShowIcon from './Icons/ShowIcon';
// consts
import { regularExpression } from './regularExpression';
// styles
import styles from '../Authorization.module.css';
import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { Registration } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
// types 
import { IFormProps, IFormRegistrationHookArgs } from './FormsTypes';
const FormRegistration: FC<IFormProps> = function ({ showPassword, setShowPassword, isLogin }) {
    const formStyle = isLogin ? [styles.form, styles.formHide].join(' ') : styles.form;
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormRegistrationHookArgs>({
        mode: 'onSubmit'
    });
    const onSubmit: SubmitHandler<IFormRegistrationHookArgs> = data => {
        const email = data.email;
        const userName = data.name;
        const password = data.password;
        dispatch(Registration({ userName, email, password }));
    };
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formStyle} >
            <h1 className={styles.title}>Регистрация</h1>

            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>Name
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    register={{
                        ...register('name', {
                            required: 'Поле обязательно для заполнения',
                        })
                    }}
                />
                {
                    errors?.name?.message &&
                    <div className={styles.errorMessage}>{errors?.name?.message}</div>
                }
            </label>
            <label className={styles.label}>
                <span className={styles.asterisk}>*</span>Email
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    type="email"
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
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input, styles.inputPasswd].join(' ')}
                    register={{
                        ...register('password', {
                            required: 'Поле обязательно для заполнения',
                            minLength: { value: 4, message: 'Длина пароля не менее 4 символов' }
                        })
                    }}
                />
                <ShowIcon
                    showPassword={showPassword}
                    styles={styles}
                    setShowPassword={setShowPassword}
                />
                {
                    errors?.password?.message &&
                    <div className={styles.errorMessage}>{errors?.password?.message}</div>
                }
            </label>
            <BtnAddCard
                aria={'Зарегистрироваться'}
                dinamicclassname={styles.button}
                children="Зарегистрироваться"
            />
        </form>
    );
};
export default FormRegistration;