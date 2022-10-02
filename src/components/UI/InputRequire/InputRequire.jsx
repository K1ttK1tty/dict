import React from 'react';
import cl from '../InputRequire/InputRequire.module.css'
const InputRequire = function ({ inputReq, setInputReq, style }) {

    return (
        <input style={style} value={inputReq} onChange={e => setInputReq(e.target.value)} className={cl.input}>

        </input>
    )
};
export default InputRequire;