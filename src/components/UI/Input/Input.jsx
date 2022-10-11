import React from 'react';
import cl from '../Input/Input.module.css'
import { useState } from 'react';
const Input = function ({ setInput, validClass, input}) {

 
    // console.log(input)
    // if (input) {
    //     setValue('')
    // }

    return (
        <input onChange={e => setInput(e.target.value)} className={[cl.input, validClass, 'inptReq ',].join(' ')}></input>
    )
};
export default Input;