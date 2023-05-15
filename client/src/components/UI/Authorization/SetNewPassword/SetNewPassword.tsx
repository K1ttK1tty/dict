import { FC, useState } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// hooks
import { useSearchParams } from 'react-router-dom';
// icons
import ShowIcon from '../forms/Icons/ShowIcon';
// styles 
import stylesAuth from '../Authorization.module.css';
import inputStyle from '../../ModalAddCards/FormAddCard.module.css';
import styles from '../ResetPassword/ResetPassword.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { refreshPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';
const SetNewPassword: FC = function () {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const userID = searchParams.get('id');
    const sendNewPassword = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(refreshPassword({ id: userID, password }));
    };

    return (
        <div className={stylesAuth.back}>
            <div className={[stylesAuth.content, stylesAuth.setPasswdContent].join(' ')}>
                <form className={stylesAuth.form} >
                    <h1 className={styles.title}>Введите новый пароль</h1>
                    <label className={stylesAuth.passwordLabel}> PASSWORD
                        <InputAddCard
                            type={showPassword ? 'text' : 'password'}
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
                            inputValue={password}
                            setValue={(e: string) => setPassword(e)}
                        />
                        <ShowIcon
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            styles={stylesAuth}
                        />
                    </label>
                    <BtnAddCard
                        aria="Отправить"
                        dinamicclassname={stylesAuth.button}
                        children="Отправить"
                        onClick={sendNewPassword}
                    />
                </form>
            </div>
        </div>
    );
};
export default SetNewPassword;