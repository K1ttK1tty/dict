import React from 'react';
import InputSearch from './UI/InputSearch/InputSearch';
import Search from '../pages/Icons/Search';
import { _inputOn } from '../functions/_inputOn';
//redux
import { useDispatch, useSelector } from 'react-redux';
const MenuVoc = function () {
    const dispatch = useDispatch()
    const input = useSelector(state => state.upMenu.input)

    return (
        <div className="menu">
            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className="menu__search" onClick={e => _inputOn(e, input, dispatch)}>
                    <InputSearch placeholder={' Search word'} />
                    <Search /></div>
            </div>
        </div>
    )
};
export default MenuVoc;