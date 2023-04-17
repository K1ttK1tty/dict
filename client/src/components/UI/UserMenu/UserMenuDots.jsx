import React from 'react';
import styles from './UserMenu.module.css'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
const UserMenuDots = function () {
    const { isUserMenuOpen } = useSelector(state => state.upMenu)
    const dispatch = useDispatch()
    
    return (
        <div
            className={styles.wrapper}
            onClick={() => dispatch(setIsUserMenuOpen(!isUserMenuOpen))}
        >
            <div className={styles.dot} />
        </div>
    )
};
export default UserMenuDots;