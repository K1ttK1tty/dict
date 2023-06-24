import { FC, memo } from 'react';
// conponents
import Avatar from '../Avatar/Avatar';
// styles
import styles from './UserMenu.module.css';
interface IUserTopMenu {
    hideMenu: string;
    isMenuOpen: boolean;
    setIsMenuOpen: (state: boolean) => void;
}
const UserTopMenu: FC<IUserTopMenu> = memo(function ({ hideMenu, isMenuOpen, setIsMenuOpen }) {
    const wrapperStyles = isMenuOpen
        ? [styles.wrapper, styles.wrapperActive, hideMenu].join(' ')
        : [styles.wrapper, hideMenu].join(' ');

    const arrowStyle = isMenuOpen
        ? [styles.arrow, styles.arrowActive].join(' ')
        : styles.arrow;
    return (
        <div className={styles.height100} onMouseDown={e => e.stopPropagation()}>
            <div
                className={wrapperStyles}
                onMouseDown={() => setIsMenuOpen(!isMenuOpen)}
            >
                <button className={styles.navbtn}>
                    <Avatar styles={styles.avatar} />
                    <div className={arrowStyle}>
                        <span></span>
                    </div>
                </button>
            </div>
        </div>
    );
});
export default UserTopMenu;