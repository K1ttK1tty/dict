import React, { useState, useEffect, memo } from 'react';
// components
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// icons
import Question from './Icons/Question';
// styles
import styles from './UserMenu.module.css'
const Info = memo(function ({ isActivated, isUserMenuOpen }) {
    const [isOpen, setIsOpen] = useState(false);


    const submenuStyles = (isOpen && isUserMenuOpen) ?
        [styles.show, styles.submenu].join(' ')
        : styles.submenu

    useEffect(() => {

        if (!isUserMenuOpen) {
            setIsOpen(false)
        }
    }, [isUserMenuOpen]);

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
                // onClick={() => dispatch(Logout())}
                />

            </div>

        </div>
    )
});
export default Info;