import { FC, useState, memo } from 'react';
import { Link } from 'react-router-dom';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// styles 
import stylesAuth from '../Authorization.module.css';
import inputStyle from '../../ModalAddCards/FormAddCard.module.css';
import styles from './ResetPassword.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { SendResetPassword } from '../../../../store/reducers/authorization/ChangePassword/Actions';
const ChangePassword: FC = memo(function () {
    const dispatch = useAppDispatch();

    const reset = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(SendResetPassword({ email }));
    };

    const [email, setEmail] = useState<string>('');
    return (
        <div className={stylesAuth.back}>

            <div className={[stylesAuth.content, styles.content].join(' ')}>
                <Link to="/">
                    <div className={styles.icon}>
                        <div className={styles.arrow}></div>
                    </div>
                </Link>
                <form className={[stylesAuth.form, styles.form].join(' ')} >
                    <h1 className={[stylesAuth.title, styles.title].join(' ')}>Смена пароля</h1>
                    <p className={styles.info}>На почту придет письмо с инструкцией по смене пароля*</p>

                    <label className={stylesAuth.passwordLabel}> EMAIL
                        <InputAddCard
                            type="email"
                            dinamicclassname={[inputStyle.inputFormAddCard, stylesAuth.input].join(' ')}
                            inputValue={email}
                            setValue={(e: string) => setEmail(e)}
                        />
                    </label>
                    <BtnAddCard
                        aria="Отправить"
                        dinamicclassname={stylesAuth.button}
                        children="Отправить"
                        onClick={reset}
                    />
                </form>
            </div>
        </div>
    );
});
export default ChangePassword;