import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
// components 
import Avatar from './Avatar';
// styles
import styles from '../UserMenu/UserMenu.module.css'
// redux
import { useSelector } from 'react-redux';
const AvatarWithInfo = memo(function ({ isMenuOpen, setFunction }) {
    const { user } = useSelector(state => state.AuthSlice)
    const showName = isMenuOpen === false
        ? [styles.hide, styles.userName].join(' ')
        : styles.userName;
    const showEmail = isMenuOpen === false
        ? [styles.hide, styles.email].join(' ')
        : styles.email;
    const menuDescAvatar = isMenuOpen === false
        ? [styles.userMain, styles.menuDesc].join(' ')
        : styles.userMain

    return (
        <div onClick={e => e.stopPropagation()} className={menuDescAvatar}>
            <div onClick={setFunction} className={styles.avatarWrapper}>
                <Avatar styles={styles.avatar} />
            </div>
            <div>
                <div className={showName}>{user?.name}</div>
                <div className={showEmail}>{user?.email}</div>
            </div>
        </div>
    )
});
export default AvatarWithInfo;