import React, { useState, memo } from 'react';
// components
import InputSearch from '../InputSearch/InputSearch';
import UserTopMenu from '../UserMenu/UserTopMenu';
import UserMenu from '../UserMenu/UserMenu';
import ModalAddAvatar from '../ModalAddAvatar/ModalAddAvatar';
// functions
import { inputSearchHandler } from '../../../functions/inputSearchHandler';
import defaultAvatar from '../../../pages/Icons/defaultAvatar.svg'
// icons
import Search from '../../../pages/Icons/Search';

//redux
import { useDispatch, useSelector } from 'react-redux';
const MenuVoc = memo(function () {
    const dispatch = useDispatch()
    const { input, isUserMenuOpen } = useSelector(state => state.upMenu)
    const { user, avatar } = useSelector(state => state.AuthSlice)
    const [modal, setModal] = useState(false);
    const imgSource = avatar ? avatar : defaultAvatar

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
                        avatar={imgSource}
                        isUserMenuOpen={isUserMenuOpen}
                    />
                    <UserMenu
                        setModal={setModal}
                        email={user?.email}
                        userName={user?.name}
                        isActivated={user.isActivated}
                        avatar={imgSource}
                        modal={modal}
                    />
                </div>
            </div>
        </div>
    )
});
export default MenuVoc;
