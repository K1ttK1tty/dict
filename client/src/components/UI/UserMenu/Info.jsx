import React, { useState, useEffect, memo } from 'react';
// components
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// icons
import Question from './Icons/Question';
// styles
import styles from './UserMenu.module.css'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { activateMail } from '../../../store/reducers/authorization/Authorization/ActionCreator';
const Info = memo(function ({ isUserMenuOpen }) {
    const dispatch = useDispatch();
    const { id, email } = useSelector(state => state.AuthSlice.user)
    useEffect(() => {
        if (!isUserMenuOpen) setIsOpen(false)
    }, [isUserMenuOpen]);

    const [isOpen, setIsOpen] = useState(false);
    const submenuStyles = (isOpen && isUserMenuOpen) ?
        [styles.show, styles.submenu].join(' ')
        : styles.submenu

    return (
        <div className={styles.infoWrapper}>
            <Question setIsOpen={setIsOpen} style={styles.icon} />
            <div className={submenuStyles}>
                <p>
                    При регистрации вам было отправлено письмо об активации аккаунта.
                </p>
                <BtnAddCard
                    children={'Отправить повторно'}
                    aria={'Отправить повторно'}
                    dinamicclassname={styles.btnExit}
                    onClick={() => dispatch(activateMail({ id, email }))}
                />
            </div>
        </div>
    )
});
export default Info;