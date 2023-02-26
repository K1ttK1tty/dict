import React from 'react';
import cl from './MySelect.module.css'
import SetOptions from '../../SetOptions';
import { CSSTransition } from 'react-transition-group';
import IconSelect from './IconSelect';
import { useSelector, useDispatch } from 'react-redux';
import { setOptionName } from '../../../store/select';
import { setOptionState } from '../../../store/select';
import { setChooseTheme } from '../../../store/select';
const MySelect = function () {
    const dispatch = useDispatch();
    const optionName = useSelector(state => state.select.optionName)
    const optionState = useSelector(state => state.select.optionState)
    function replaceOption(el) {
        dispatch(setOptionName(el.target.innerText))
        dispatch(setChooseTheme(el.target.innerText))
        dispatch(setOptionState({ open: false, removeMark: true }))
    }
    function getValue() {
        dispatch(setOptionState({ ...optionState, open: !optionState.open }))
    }
    function removeTheme() {
        dispatch(setOptionName('Choose a theme'))
        dispatch(setOptionState({ open: false, removeMark: false }))
        dispatch(setChooseTheme(''))
    }
    return (
        <div className={cl.select} >
            <div onClick={getValue} id='select1' className={cl.title}>
                <div onClick={getValue} id='select2' className={cl.selectValue}>{optionName}</div>
                <div className={cl.selectIcon}><IconSelect /></div>
            </div>
            {optionState.removeMark ? <div id='select3' onClick={removeTheme} className={cl.removeTheme}>&times;</div> : ''}

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