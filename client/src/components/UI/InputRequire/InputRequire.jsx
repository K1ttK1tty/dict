import React, { memo } from 'react';
// styles
import styles from '../InputRequire/InputRequire.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputReq } from '../../../store/reducers/GamesSlice';
const InputRequire = memo(function () {
    const inputReq = useSelector(state => state.GamesSlice.inputReq);
    const dispatch = useDispatch();

    return (
        < input
            value={inputReq ? inputReq : ''}
            type='number'
            onChange={e => dispatch(setInputReq(e.target.value))}
            className={styles.input}
        />
    )
});
export default InputRequire;