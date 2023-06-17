import { FC, memo } from 'react';
// conponents
import Avatar from '../Avatar/Avatar';
// styles
import styles from './UserMenu.module.css';
// redux
import { useAppDispatch } from '../../../hooks/redux';
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
interface IUserTopMenu {
    isUserMenuOpen: boolean;
    hideMenu: string;
}
const UserTopMenu: FC<IUserTopMenu> = memo(function ({ isUserMenuOpen, hideMenu }) {
    const dispatch = useAppDispatch();

    const wrapperStyles = isUserMenuOpen
        ? [styles.wrapper, styles.wrapperActive, hideMenu].join(' ')
        : [styles.wrapper, hideMenu].join(' ');

    const arrowStyle = isUserMenuOpen
        ? [styles.arrow, styles.arrowActive].join(' ')
        : styles.arrow;

    return (
        <div
            className={wrapperStyles}
            onMouseDown={() => dispatch(setIsUserMenuOpen(!isUserMenuOpen))}
        >
            <button className={styles.navbtn}>
                <Avatar styles={styles.avatar} />
                <div className={arrowStyle}>
                    <span></span>
                </div>
            </button>
        </div>
    );
});
export default UserTopMenu;