// libs
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// hooks
import { useSearchParams } from 'react-router-dom';
// icons
import ShowIcon from '../forms/Icons/ShowIcon';
// styles 
import stylesAuth from '../Authorization.module.css';
import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
import styles from '../ResetPassword/ResetPassword.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { refreshPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';
// types
import { ISetNewPassword } from '../forms/FormsTypes';
const SetNewPassword: FC = function () {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const userID = searchParams.get('id');
    const { register, handleSubmit, formState: { errors } } = useForm<ISetNewPassword>({
        mode: 'onSubmit'
    });
    const onSubmit: SubmitHandler<ISetNewPassword> = data => {

        const password = data.password;
        dispatch(refreshPassword({ id: userID, password }));
    };

    return (
        <div className={stylesAuth.back}>
            <div className={[stylesAuth.content, stylesAuth.setPasswdContent].join(' ')}>
                <form onSubmit={handleSubmit(onSubmit)} className={stylesAuth.form} >
                    <h1 className={styles.title}>Введите новый пароль</h1>
                    <label className={stylesAuth.passwordLabel}> 
                    <span className={stylesAuth.asterisk}>*</span>Password
                        <InputAddCard
                            type={showPassword ? 'text' : 'password'}
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
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
                            styles={stylesAuth}
                        />
                        {
                            errors?.password?.message &&
                            <div className={stylesAuth.errorMessage}>{errors?.password?.message}</div>
                        }
                    </label>
                    <BtnAddCard
                        aria="Отправить"
                        dinamicclassname={stylesAuth.button}
                        children="Отправить"
                    />
                </form>
            </div>
        </div>
    );
};
export default SetNewPassword;