import React from 'react';
import cl from './InputSearch.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord } from '../../../store/upMenu';
import { setInput } from '../../../store/upMenu';
const InputSearch = function ({ placeholder }) {

    const dispatch = useDispatch()
    const searchWord = useSelector(state => state.upMenu.searchWord)
    const input = useSelector(state => state.upMenu.input)
    const inputElement = document.getElementById('1');

    function inputHandle(event) {
        dispatch(setSearchWord(event.target.value))
    }

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
            id='1' onChange={inputHandle}
            className={[cl.inputShared, cl.inputOff].join(' ')}
        />
    }
    if (!input.isOpen) {
        return <input
            value={searchWord}
            placeholder={placeholder}
            id='1'
            onChange={inputHandle}
            className={[cl.inputShared, cl.inputOff, cl.inputOffAnimation].join(' ')}
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
            onChange={inputHandle}
            className={[cl.inputShared, cl.inputOn, cl.inputOnAnimation].join(' ')}
        />
    }
};
export default InputSearch;