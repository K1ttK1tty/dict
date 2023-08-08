import { FC, memo } from 'react';

import { cutLongLine } from '../../../functions/cutLongLine';
import { useAppSelector } from '../../../hooks/redux';

import styles from '../UserMenu/UserMenu.module.css';

import { IAvatarWithInfoProps } from './AvatarModels';

import Avatar from './Avatar';

const AvatarWithInfo: FC<IAvatarWithInfoProps> = memo(function ({ isMenuOpen, setFunction }) {
    const { user } = useAppSelector(state => state.AuthSlice);
    const showName = isMenuOpen === false ? [styles.hide, styles.userName].join(' ') : styles.userName;
    const showEmail = isMenuOpen === false ? [styles.hide, styles.email].join(' ') : styles.email;
    const menuDescAvatar = isMenuOpen === false ? [styles.userMain, styles.menuDesc].join(' ') : styles.userMain;
    return (
        <div onClick={e => e.stopPropagation()} className={menuDescAvatar}>
            <div data-testid="avatar" onClick={() => setFunction(true)} className={styles.avatarWrapper}>
                <Avatar styles={styles.avatar} />
            </div>
            <div>
                <div className={showName}>{cutLongLine(user?.name, 17)}</div>
                <div className={showEmail}>{cutLongLine(user?.email, 28)}</div>
            </div>
        </div>
    );
});
export default AvatarWithInfo;
