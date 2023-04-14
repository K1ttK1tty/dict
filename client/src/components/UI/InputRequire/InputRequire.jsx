import React from 'react';
import cl from '../InputRequire/InputRequire.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputReq } from '../../../store/GamesSlice';
const InputRequire = function () {
    const inputReq = useSelector(state => state.GamesSlice.inputReq);
    const dispatch = useDispatch();

    return <input value={inputReq} onChange={e => dispatch(setInputReq(e.target.value))} className={cl.input} />
};
export default InputRequire;