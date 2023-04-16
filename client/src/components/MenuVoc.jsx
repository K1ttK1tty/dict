import React from 'react';
// components
import InputSearch from './UI/InputSearch/InputSearch';
import Search from '../pages/Icons/Search';
// functions
import { inputSearchHandler } from '../functions/inputSearchHandler';
//redux
import { useDispatch, useSelector } from 'react-redux';
const MenuVoc = function () {
    const dispatch = useDispatch()
    const input = useSelector(state => state.upMenu.input)

    return (
        <div className="menu">
            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className="menu__search" onClick={e => inputSearchHandler(e, input, dispatch)}>
                    <InputSearch placeholder={' Search word'} />
                    <Search /></div>
            </div>
        </div>
    )
};
export default MenuVoc;