import { FC, useState, memo } from 'react';
// components
import InputSearch from '../InputSearch/InputSearch';
import UserTopMenu from '../UserMenu/UserTopMenu';
import UserMenu from '../UserMenu/UserMenu';
import ModalAddAvatar from '../Modal/ModalAddAvatar/ModalAddAvatar';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
// functions
import { inputSearchHandler } from '../../../functions/inputSearchHandler';
// icons
import Search from '../../../pages/Icons/Search';
// styles
import styles from '../UserMenu/UserMenu.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
const MenuVoc: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { input } = useAppSelector(state => state.upMenu);
    const { user } = useAppSelector(state => state.AuthSlice);
    const [modal, setModal] = useState<boolean>(false);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);

    return (
        <div className="menu">
            <ModalAddAvatar
                isModal={modal}
                setModal={setModal}
            />
            <div className="menu__container" >
                <div className="menu__logo">Logo</div>
                <div className="rightItmes">

                    <div className="menu__search" onMouseDown={e => inputSearchHandler(e, input, dispatch)}>
                        <InputSearch />
                        <Search />
                    </div>
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
