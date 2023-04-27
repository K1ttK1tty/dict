import React, { memo } from 'react';
// conponents
import Avatar from '../Avatar/Avatar';
// styles
import styles from './UserMenu.module.css'
// redux
import { useDispatch } from 'react-redux';
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
const UserTopMenu = memo(function ({ isUserMenuOpen, hideMenu }) {
    const dispatch = useDispatch()

    const wrapperStyles = isUserMenuOpen
        ? [styles.wrapper, styles.wrapperActive, hideMenu].join(' ')
        : [styles.wrapper, hideMenu].join(' ');

    const arrowStyle = isUserMenuOpen
        ? [styles.arrow, styles.arrowActive].join(' ')
        : styles.arrow

    return (
        <div
            className={wrapperStyles}
            onClick={() => dispatch(setIsUserMenuOpen(!isUserMenuOpen))}
        >
            <button className={styles.navbtn}>
                <Avatar styles={styles.avatar} />
                <div className={arrowStyle}>
                    <span></span>
                </div>
            </button>
        </div>
    )
});
export default UserTopMenu;