import React, { useState } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// hooks
import { useSearchParams } from 'react-router-dom';
// icons
import ShowIcon from '../forms/Icons/ShowIcon';
// styles 
import stylesAuth from '../Authorization.module.css'
import inputStyle from '../../ModalAddCards/FormAddCard.module.css'
import styles from '../ResetPassword/ResetPassword.module.css'
// redux
import { useDispatch } from 'react-redux';
import { refreshPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';
const SetNewPassword = function () {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const userID = searchParams.get('id')

    const sendNewPassword = (e) => {
        e.preventDefault();
        dispatch(refreshPassword({id:userID, password}))
    }


    return (
        <div className={stylesAuth.back}>

            <div className={[stylesAuth.content, stylesAuth.setPasswdContent].join(' ')}>
                <form className={stylesAuth.form} >
                    <h1 className={styles.title}>Введите новый пароль</h1>
                    {/* <p className={styles.info}>На почту придет письмо с инструкцией по смене пароля*</p> */}

                    <label className={stylesAuth.passwordLabel}> PASSWORD
                        <InputAddCard
                            type={showPassword ? 'text' : 'password'}
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
                            inputValue={password}
                            setValue={e => setPassword(e)}
                        />
                        <ShowIcon
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            styles={stylesAuth}
                        />
                    </label>

                    <BtnAddCard
                        aria='Отправить'
                        dinamicclassname={stylesAuth.button}
                        children='Отправить'
                        onClick={sendNewPassword}
                    />



                </form>
            </div>
        </div>
    )
};
export default SetNewPassword;