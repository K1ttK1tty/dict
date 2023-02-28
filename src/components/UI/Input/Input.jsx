import React from 'react';
import cl from '../Input/Input.module.css'
const Input = function ({ validClass }) {
    return (
        <input className={[cl.input, validClass, 'inptReq ',].join(' ')}></input>
    )
};
export default Input;