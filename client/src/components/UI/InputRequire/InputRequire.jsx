import React from 'react';
// styles
import cl from '../InputRequire/InputRequire.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputReq } from '../../../store/reducers/GamesSlice';
const InputRequire = function () {
    const inputReq = useSelector(state => state.GamesSlice.inputReq);
    const dispatch = useDispatch();

    return (
        < input
            value={inputReq ? inputReq : ''}
            type='number'
            onChange={e => dispatch(setInputReq(e.target.value))}
            className={cl.input}
        />
    )
};
export default InputRequire;