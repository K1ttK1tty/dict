import { FC, useState, memo } from 'react';
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
    const [isAvatarModal, setIsAvatarModel] = useState<boolean>(false);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const path = window.location.pathname;
    let enableSearch = false;
    if (path === '/posts' || path === '/') {
        enableSearch = true;
    }
    return (
        <div className="menu">
            <ModalAddAvatar
                isAvatarModal={isAvatarModal}
                setModal={setIsAvatarModel}
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
                        isAvatarModal={isAvatarModal}
                        content={
                            <UserMenu
                                setModal={setIsAvatarModel}
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