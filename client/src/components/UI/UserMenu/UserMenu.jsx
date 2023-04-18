import React, { useRef, useEffect } from 'react';
// components
import ThemeChanger from '../ThemeChanger/ThemeChanger';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
import { keyClose } from '../../../functions/keyClose';
// styles
import styles from './UserMenu.module.css'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../store/reducers/asyncActions/ActionCreator';
const UserMenu = function ({ email, isActivated }) {
    const dispatch = useDispatch();
    const { isUserMenuOpen } = useSelector(state => state.upMenu)

    const menuElement = useRef()
    let isOpenMenu = [styles.content, styles.hidden].join(' ');

    if (isUserMenuOpen) {
        isOpenMenu = styles.content;
        setTimeout(() => {
            menuElement.current.focus()
        }, 200);
    }

    useEffect(() => {
        dispatch(setIsUserMenuOpen(false))
        return () => dispatch(setIsUserMenuOpen(false))
    }, []);

    return (
        <div
            onClick={e => e.stopPropagation()}
            onKeyDown={e => keyClose(e, setIsUserMenuOpen, dispatch)}
            className={isOpenMenu}
            tabIndex="0"
            ref={menuElement}
        >
            <div className={styles.contentWrapper}>
                <div className={styles.mb14}>{email}</div>
                <p className={[styles.account, styles.mb14].join(' ')}>
                    Аккаунт: {isActivated ? 'активирован' : 'не активирован'}
                </p>
                <div className={[styles.theme, styles.mb14].join(' ')}>
                    <p>Тема: </p>
                    <div><ThemeChanger /></div>
                </div>
            </div>
            <BtnAddCard
                aria={'change'}
                dinamicclassname={styles.btnExit}
                children='Выйти из аккаунта'
                onClick={() => dispatch(Logout())}
            />

        </div >
    )
};
export default UserMenu;