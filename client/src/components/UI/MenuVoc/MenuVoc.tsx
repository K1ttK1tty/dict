import { FC, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/redux';

import styles from '../UserMenu/UserMenu.module.css';

import { IMenuVoc } from './MenuVocModel';

import DropDownMenu from '../DropDownMenu/DropDownMenu';
import ModalAddAvatar from '../Modal/ModalAddAvatar/ModalAddAvatar';
import UserMenu from '../UserMenu/UserMenu';
import UserTopMenu from '../UserMenu/UserTopMenu';
import SearchItem from './SearchItem';

const MenuVoc: FC<IMenuVoc> = memo(function ({ setMenuOpen }) {
    const { user } = useAppSelector(state => state.AuthSlice);
    const [isAvatarModal, setIsAvatarModel] = useState<boolean>(false);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const path = useLocation().pathname;
    let enableSearch = false;
    if (path === '/posts' || path === '/') {
        enableSearch = true;
    }
    return (
        <div className="menu">
            <ModalAddAvatar isAvatarModal={isAvatarModal} setModal={setIsAvatarModel} />
            <div className="menu__container">
                <div className={styles.openMenuButton} onClick={() => setMenuOpen(prev => !prev)}>
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
