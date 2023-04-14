import React from 'react';
import cl from './InputSearch.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord,setInput } from '../../../store/upMenu';
const InputSearch = function ({ placeholder }) {
    const dispatch = useDispatch()
    const searchWord = useSelector(state => state.upMenu.searchWord)
    const input = useSelector(state => state.upMenu.input)
    const inputElement = document.getElementById('1');

    function handleKey(key) {
        if (key.keyCode === 27) {
            dispatch(setSearchWord(''))
            dispatch(setInput({ isOpen: false, after: input.after }))
            inputElement.blur();
        }
    }
    
    if (!input.after) {
        dispatch(setInput({ ...input, after: '1' }))
        return <input
            value={searchWord}
            placeholder={placeholder}
            id='1'
            onChange={e => dispatch(setSearchWord(e.target.value))}
            className={[cl.inputShared, cl.inputOff, 'ifNotThisThenClose'].join(' ')}
        />
    }
    if (!input.isOpen) {
        return <input
            value={searchWord}
            placeholder={placeholder}
            id='1'
            onChange={e => dispatch(setSearchWord(e.target.value))}
            className={[cl.inputShared, cl.inputOff, cl.inputOffAnimation, 'ifNotThisThenClose'].join(' ')}
        />

    } else {
        setTimeout(() => {
            inputElement.focus();
        }, 200);

        return <input
            value={searchWord}
            placeholder={placeholder}
            id='1'
            onKeyDown={handleKey}
            onChange={e => dispatch(setSearchWord(e.target.value))}
            className={[cl.inputShared, cl.inputOn, cl.inputOnAnimation, 'ifNotThisThenClose'].join(' ')}
        />
    }
};
export default InputSearch;