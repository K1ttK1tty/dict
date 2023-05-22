import { FC } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ShowIcon from './Icons/ShowIcon';
// styles
import styles from '../Authorization.module.css';
import inputStyle from '../../ModalAddCards/FormAddCard.module.css';
// types 
import { IFormRegistrationProps } from './FormsTypes';
const FormRegistration: FC<IFormRegistrationProps> = function ({
    userName,
    setUserName,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    password,
    setPassword,
    action,
    isLogin
}) {
    const formStyle = isLogin ? [styles.form, styles.formHide].join(' ') : styles.form;
    return (
        <form className={formStyle} >
            <h1 className={styles.title}>Регистрация</h1>
            <label> Name
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={userName}
                    setValue={(e: string) => setUserName(e)}
                />
            </label>
            <label> email
                <InputAddCard
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={email}
                    setValue={(e: string) => setEmail(e)}
                    type="email"
                />
            </label>
            <label className={styles.passwordLabel}> password
                <InputAddCard
                    type={showPassword ? 'text' : 'password'}
                    dinamicclassname={[inputStyle.inputFormAddCard, styles.input].join(' ')}
                    inputValue={password}
                    setValue={(e: string) => setPassword(e)}
                />
                <ShowIcon
                    showPassword={showPassword}
                    styles={styles}
                    setShowPassword={setShowPassword}
                />
            </label>
            <BtnAddCard
                aria={'Зарегистрироваться'}
                dinamicclassname={styles.button}
                children="Зарегистрироваться"
                onClick={action}
            />
        </form>
    );
};
export default FormRegistration;