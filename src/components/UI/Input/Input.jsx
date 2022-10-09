import React from 'react';
import cl from '../Input/Input.module.css'
const Input = function ({setInput}) {

    return (
        <input onChange={e => setInput(e.target.value)} className={[cl.input,'inptReq ',].join(' ')}></input>
    )
};
export default Input;