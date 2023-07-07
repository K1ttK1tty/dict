import { FC, useState, useEffect, memo } from 'react';
// components
import UserTopMenu from '../UserMenu/UserTopMenu';
import UserMenu from '../UserMenu/UserMenu';
import ModalAddAvatar from '../Modal/ModalAddAvatar/ModalAddAvatar';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import SearchItem from './SearchItem';
// styles
import styles from '../UserMenu/UserMenu.module.css';
//redux
import { useAppSelector } from '../../../hooks/redux';
import { IMenuVoc } from './MenuVocModel';
const MenuVoc: FC<IMenuVoc> = memo(function ({ menuOpen, setMenuOpen }) {
    const { user } = useAppSelector(state => state.AuthSlice);
    const [modal, setModal] = useState<boolean>(false);
    const [enableSearch, setEnableSearch] = useState<boolean>(true);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/posts' || path === '/') {
            setEnableSearch(true);
        } else setEnableSearch(false);
        return () => {
            setIsDropDownMenuOpen(false);
        };
    }, [window.location.pathname]);
    return (
        <div className="menu">
            <ModalAddAvatar
                isModal={modal}
                setModal={setModal}
            />
            <div className="menu__container" >
                <div
                    className={styles.openMenuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className={styles.openMenuIcon}></div>
                </div>
                <div className="menu__logo">Logo</div>
                <div className="rightItmes">
                    {enableSearch && <SearchItem />}
                    <DropDownMenu
                        isMenuOpen={isDropDownMenuOpen}
                        setIsMenuOpen={setIsDropDownMenuOpen}
                        isAvatarMenuOpen={modal}
                        content={
                            <UserMenu
                                setModal={setModal}
                                isActivated={user?.isActivated}
                                isDropDownMenuOpen={isDropDownMenuOpen}
                            />
                        }
                    />
                    <UserTopMenu
                        hideMenu={styles.hideMenu}
                        isMenuOpen={isDropDownMenuOpen}
                        setIsMenuOpen={setIsDropDownMenuOpen}
                    />
                </div>
            </div>
        </div>
    );
});
export default MenuVoc;