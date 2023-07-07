import { FC, memo } from 'react';
// components
import ThemeChanger from '../ThemeChanger/ThemeChanger';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import Info from './Info';
import AvatarWithInfo from '../Avatar/AvatarWithInfo';
// styles
import styles from './UserMenu.module.css';
// redux
import { useAppDispatch } from '../../../hooks/redux';
import { Logout } from '../../../store/reducers/authorization/Authorization/ActionCreator';
import { IUserMenuProps } from './UserMenuModel';
const UserMenu: FC<IUserMenuProps> = memo(function ({ isActivated, setModal, isDropDownMenuOpen }) {
    const dispatch = useAppDispatch();
    return (
        <>
            <div className={styles.contentWrapper} onMouseDown={e => e.stopPropagation()}>
                <AvatarWithInfo setFunction={setModal} />
                <div className={[styles.activation, styles.mb14].join(' ')}>
                    <p className={styles.account}>
                        Аккаунт: {isActivated ? 'активирован' : 'не активирован'}
                    </p>
                    {!isActivated && <Info isUserMenuOpen={isDropDownMenuOpen} />}
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
        </>
    );
});
export default UserMenu;