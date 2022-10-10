import React from 'react';
import cl from '../Input/Input.module.css'
const Input = function ({setInput,validClass}) {

    return (
        <input onChange={e => setInput(e.target.value)} className={[cl.input,validClass,'inptReq ',].join(' ')}></input>
    )
};
export default Input;