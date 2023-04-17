import React from 'react';
// components
import InputSearch from './UI/InputSearch/InputSearch';
import UserMenuDots from './UI/UserMenu/UserMenuDots';
import UserMenu from './UI/UserMenu/UserMenu';
// functions
import { inputSearchHandler } from '../functions/inputSearchHandler';
// icons
import Search from '../pages/Icons/Search';
//redux
import { useDispatch, useSelector } from 'react-redux';
const MenuVoc = function () {
    const dispatch = useDispatch()
    const input = useSelector(state => state.upMenu.input)
    const { user, isActivated } = useSelector(state => state.AuthSlice)

    return (
        <div className="menu">
            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className='rightItmes'>
                    <div className="menu__search" onClick={e => inputSearchHandler(e, input, dispatch)}>
                        <InputSearch />
                        <Search />
                    </div>
                    <UserMenuDots />
                    <UserMenu
                        email={user.email}
                        isActivated={isActivated}
                    />
                </div>
            </div>
        </div>
    )
};
export default MenuVoc;