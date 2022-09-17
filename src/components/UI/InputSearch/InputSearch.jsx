import React from 'react';
import cl from './InputSearch.module.css'
import { useState } from 'react';
const InputSearch = function ({ input, placeholder, searchWord, setSearchWord }) {
    function inputHandle(event) {
        // console.log(event.target.value);
        setSearchWord(event.target.value);
    }

    const inputElement = document.getElementById('1');
    const [inputKey, setInputKey] = useState('');
    

    function handleKey(key) {
        setInputKey(key.keyCode)
    }


    if (!input.after) {
        input.after = '1';
        return <input value={searchWord} placeholder={placeholder} id='1' onChange={inputHandle} className={[cl.inputShared, cl.inputOff].join(' ')}></input>
    }
    if (inputKey == 27) {
        inputElement.blur();
        setInputKey('')
        input.before = false;
    }
    if (!input.before) {
        inputElement.blur();
        return <input value={searchWord} placeholder={placeholder} id='1' onChange={inputHandle} className={[cl.inputShared, cl.inputOff, cl.inputOffAnimation].join(' ')}></input>
    } else {
        setTimeout(() => {
            inputElement.focus();
        }, 200);
        return <input value={searchWord} placeholder={placeholder} id='1' onKeyDown={handleKey} onChange={inputHandle} className={[cl.inputShared, cl.inputOn, cl.inputOnAnimation].join(' ')}></input>
    }
};
export default InputSearch;