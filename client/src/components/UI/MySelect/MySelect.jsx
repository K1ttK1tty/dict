import React from 'react';
import cl from './MySelect.module.css'
import SetOptions from '../../SetOptions';
import { CSSTransition } from 'react-transition-group';
import IconSelect from './IconSelect';
import { useSelector, useDispatch } from 'react-redux';
import {
    setOptionName,
    setOptionState,
    setChooseTheme
} from '../../../store/select';
const MySelect = function () {
    const dispatch = useDispatch();
    const optionName = useSelector(state => state.select.optionName)
    const optionState = useSelector(state => state.select.optionState)

    function replaceOption(el) {
        dispatch(setOptionName(el.target.innerText))
        dispatch(setChooseTheme(el.target.innerText))
        dispatch(setOptionState({ open: false, removeMark: true })) //
    }
    function removeTheme() {
        dispatch(setOptionName('Choose a theme'))
        dispatch(setChooseTheme(''))
        dispatch(setOptionState({ open: false, removeMark: false })) //
    }
    return (
        <div className={cl.select} >
            <div
                onClick={() => dispatch(setOptionState({ ...optionState, open: !optionState.open }))}
                className={[cl.title, 'ifNotThisThenClose'].join(' ')}
            >

                <div
                    onClick={() => dispatch(setOptionState({ ...optionState, open: !optionState.open }))}
                    className={[cl.selectValue, 'ifNotThisThenClose'].join(' ')}
                >{optionName}</div>

                <div className={cl.selectIcon}><IconSelect /></div>

            </div>

            {optionState.removeMark ?
                <div id='close' onClick={removeTheme} className={cl.removeTheme}>&times;</div>
                : ''
            }
            <CSSTransition
                in={optionState.open}
                timeout={220}
                classNames="stateOption"
                mountOnEnter
                unmountOnExit
            >
                {state => <SetOptions state={state} className={optionState.open} replaceOption={replaceOption} />}
            </CSSTransition>
        </div>
    )
};
export default MySelect;