import React from 'react';
import cl from '../InputRequire/InputRequire.module.css'
const InputRequire = function ({ inputReq, setInputReq,}) {

    return (
        <input value={inputReq} onChange={e => setInputReq(e.target.value)} className={cl.input}>

        </input>
    )
};
export default InputRequire;