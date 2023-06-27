// libs
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// consts 
import { regularExpression } from '../forms/regularExpression';
// styles 
import stylesAuth from '../Authorization.module.css';
import inputStyle from '../../Modal/ModalAddCards/FormAddCard.module.css';
import styles from './ResetPassword.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { SendResetPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';
// types
import { IChangePassword } from '../forms/FormsTypes';
const ChangePassword: FC = function () {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword>({
        mode: 'onSubmit'
    });
    const onSubmit: SubmitHandler<IChangePassword> = data => {

        const email = data.email;
        dispatch(SendResetPassword({ email }));
    };

    return (
        <div className={stylesAuth.back}>

            <div className={[stylesAuth.content, styles.content].join(' ')}>
                <Link to="/">
                    <div className={styles.icon}>
                        <div className={styles.arrow}></div>
                    </div>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className={[stylesAuth.form, styles.form].join(' ')} >
                    <h1 className={[stylesAuth.title, styles.title].join(' ')}>Смена пароля</h1>
                    <p className={styles.info}>На почту придет письмо с инструкцией по смене пароля*</p>

                    <label className={stylesAuth.passwordLabel}>
                        <span className={stylesAuth.asterisk}>*</span>Email
                        <InputAddCard
                            type="email"
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
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
                            <div className={stylesAuth.errorMessage}>{errors?.email?.message}</div>
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
export default ChangePassword;