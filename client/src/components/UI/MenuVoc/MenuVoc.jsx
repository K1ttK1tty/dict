import React, { useState, memo } from 'react';
// components
import InputSearch from '../InputSearch/InputSearch';
import UserTopMenu from '../UserMenu/UserTopMenu';
import UserMenu from '../UserMenu/UserMenu';
import ModalAddAvatar from '../ModalAddAvatar/ModalAddAvatar';
// functions
import { inputSearchHandler } from '../../../functions/inputSearchHandler';
// icons
import Search from '../../../pages/Icons/Search';
// styles
import styles from '../UserMenu/UserMenu.module.css'
//redux
import { useDispatch, useSelector } from 'react-redux';
const MenuVoc = memo(function () {
    const dispatch = useDispatch()
    const { input, isUserMenuOpen } = useSelector(state => state.upMenu)
    const { user } = useSelector(state => state.AuthSlice)
    const [modal, setModal] = useState(false);

    return (
        <div className="menu">
            <ModalAddAvatar
                isModal={modal}
                setModal={setModal}
            />

            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className='rightItmes'>
                    <div className="menu__search" onClick={e => inputSearchHandler(e, input, dispatch)}>
                        <InputSearch />
                        <Search />
                    </div>
                    <UserTopMenu
                        isUserMenuOpen={isUserMenuOpen}
                        hideMenu={styles.hideMenu}
                    />
                    <UserMenu
                        setModal={setModal}
                        email={user?.email}
                        userName={user?.name}
                        isActivated={user.isActivated}
                        modal={modal}
                    />
                </div>
            </div>
        </div>
    )
});
export default MenuVoc;
