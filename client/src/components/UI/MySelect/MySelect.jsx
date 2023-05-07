// libs
import React, { useRef, useEffect, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
// components
import SetOptions from '../../SetOptions';
import IconSelect from './icons/IconSelect';
// styles
import styles from './MySelect.module.css'
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
    setOptionName,
    setOptionState,
    setChooseTheme
} from '../../../store/reducers/authorization/Authorization/AuthSlice';
const MySelect = memo(function ({ isCanMove }) {
    const dispatch = useDispatch();
    const optionName = useSelector(state => state.AuthSlice.optionName)
    const optionState = useSelector(state => state.AuthSlice.optionState)
    const selectElement = useRef()
    const isCanMoveFunction = isCanMove
        ? null :
        () => dispatch(setOptionState({ ...optionState, open: !optionState.open }))

    function replaceOption(el) {
        dispatch(setOptionName(el.target.innerText))
        dispatch(setChooseTheme(el.target.innerText))
        dispatch(setOptionState({ open: false, removeMark: true })) //
    }
    function removeTheme() {
        dispatch(setOptionName('Тема'))
        dispatch(setChooseTheme(''))
        dispatch(setOptionState({ open: false, removeMark: false })) //
    }
    if (optionState.open) {
        setTimeout(() => {
            selectElement.current.focus()
        }, 200);
    }
    useEffect(() => {
        if (optionName !== 'Тема') {
            dispatch(setOptionState({ ...optionState, removeMark: true }))
        } else {
            dispatch(setOptionState({ ...optionState, removeMark: false }))
        }
        return () => {
            dispatch(setOptionState({ ...optionState, open: false }))
        }
    }, []);

    return (
        <div
            className={styles.select}
            ref={selectElement}
            onKeyDown={() => dispatch(setOptionState({ ...optionState, open: false }))}
            tabIndex='0'
        >
            <div
                onClick={isCanMoveFunction}
                className={[styles.title, 'ifNotThisThenClose'].join(' ')}
            >
                <div
                    onClick={isCanMoveFunction}
                    className={[styles.selectValue, 'ifNotThisThenClose'].join(' ')}
                >
                    {optionName}
                </div>
                <div className={styles.selectIcon}><IconSelect /></div>
            </div>
            {
                optionState.removeMark &&
                <button id='close' onClick={removeTheme} className={styles.removeTheme}>&times;</button>
            }
            <CSSTransition
                in={optionState.open}
                timeout={180}
                classNames="stateOption"
                mountOnEnter
                unmountOnExit
            >
                {state => <SetOptions
                    state={state}
                    className={optionState.open}
                    replaceOption={replaceOption}
                />
                }
            </CSSTransition>
        </div>
    )
});
export default MySelect;