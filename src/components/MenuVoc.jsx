import React from 'react';
import InputSearch from './UI/InputSearch/InputSearch';
import Search from '../pages/Icons/Search';
// import { _inputOn } from '../functions/_inputOn';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearchWord } from '../store/upMenu';
import { setInput } from '../store/upMenu';
const MenuVoc = function ({ }) {
    const dispatch = useDispatch()
    const input = useSelector(state => state.upMenu.input)

    function clearINput() {
        dispatch(setSearchWord(''))
    }
    function inputOn(event) {
        if (event.target.id == 1) {
            return false
        }
        if (!input.isOpen) {
            dispatch(setInput({ isOpen: true, after: input.after }))

        } else {
            dispatch(setInput({ isOpen: false, after: input.after }))
            clearINput();
        }
    }

    return (
        <div className="menu">
            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className="menu__search" onClick={inputOn}>
                    <InputSearch placeholder={' Search word'} />
                    <Search /></div>
            </div>
        </div>
    )
};
export default MenuVoc;