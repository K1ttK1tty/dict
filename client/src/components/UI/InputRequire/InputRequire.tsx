import { FC, memo } from 'react';
// styles
import styles from '../InputRequire/InputRequire.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setInputReq } from '../../../store/reducers/GamesSlice';
const InputRequire: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { inputReq } = useAppSelector(state => state.GamesSlice);
    return (
        < input
            value={inputReq ? inputReq : ''}
            type="number"
            onChange={e => dispatch(setInputReq(Number(e.target.value)))}
            className={styles.input}
        />
    );
});
export default InputRequire;