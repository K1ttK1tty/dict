import { FC, useRef, useEffect, memo } from 'react';
// components
import ThemeChanger from '../ThemeChanger/ThemeChanger';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import Info from './Info';
import AvatarWithInfo from '../Avatar/AvatarWithInfo';
// functions
import { keyClose } from '../../../functions/keyClose';
// styles
import styles from './UserMenu.module.css';
// redux
import { setIsUserMenuOpen } from '../../../store/reducers/upMenu';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Logout } from '../../../store/reducers/authorization/Authorization/ActionCreator';
interface IUserMenuProps {
    isActivated: boolean;
    setModal: (state: boolean) => void;
    modal: boolean;
}
const UserMenu: FC<IUserMenuProps> = memo(function ({ isActivated, setModal, modal }) {
    const dispatch = useAppDispatch();
    const { isUserMenuOpen } = useAppSelector(state => state.upMenu);
    const menuElement = useRef<HTMLDivElement | null>(null);
    let isOpenMenu = [styles.content, styles.hidden].join(' ');

    useEffect(() => {
        dispatch(setIsUserMenuOpen(false));
    }, []);
    if (isUserMenuOpen && !modal) {
        isOpenMenu = styles.content;
        setTimeout(() => {
            if (menuElement.current) {
                menuElement.current.focus();
            }
        }, 150);
    }
    return (
        <div
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => keyClose(e, setIsUserMenuOpen, dispatch)}
            className={isOpenMenu}
            tabIndex={1}
            ref={menuElement}
        >
            <div className={styles.contentWrapper}>
                <AvatarWithInfo setFunction={() => setModal(true)} />
                <div className={[styles.activation, styles.mb14].join(' ')}>
                    <p className={styles.account}>
                        Аккаунт: {isActivated ? 'активирован' : 'не активирован'}
                    </p>
                    {!isActivated && <Info isUserMenuOpen={isUserMenuOpen} />}
                </div>
                <div className={styles.theme}>
                    <p>Тема: </p>
                    <div><ThemeChanger /></div>
                </div>
            </div>
            <BtnAddCard
                aria={'change'}
                dinamicclassname={styles.btnExit}
                children="Выйти из аккаунта"
                onClick={() => dispatch(Logout())}
            />
        </div >
    );
});
export default UserMenu;