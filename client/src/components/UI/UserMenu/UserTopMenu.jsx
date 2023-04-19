import React from 'react';
import styles from './UserMenu.module.css'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
const UserTopMenu = function ({ avatar }) {
    const { isUserMenuOpen } = useSelector(state => state.upMenu)
    const dispatch = useDispatch()

    const wrapperStyles = isUserMenuOpen
        ? [styles.wrapper, styles.wrapperActive].join(' ')
        : styles.wrapper;

    const arrowStyle = isUserMenuOpen
        ? [styles.arrow, styles.arrowActive].join(' ')
        : styles.arrow

    return (
        <div
            className={wrapperStyles}
            onClick={() => dispatch(setIsUserMenuOpen(!isUserMenuOpen))}
        >
            <button className={styles.navbtn}>
                <img className={styles.avatar} src={avatar} alt="Аватар" />
                <div className={arrowStyle}>
                    <span></span>
                </div>
            </button>
        </div>
    )
};
export default UserTopMenu;