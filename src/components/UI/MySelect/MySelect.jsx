import React from 'react';
import cl from './MySelect.module.css'
import { useState } from 'react';
import SetOptions from '../../SetOptions';
import { CSSTransition } from 'react-transition-group';
import IconSelect from './IconSelect';
const MySelect = function ({ setChooseTheme, selectOptions, stateOption, setStateOption, replaceOptionName, setReplaceOptionName }) {


    function replaceOption(el) {
        setReplaceOptionName(el.target.innerText);
        setChooseTheme(el.target.innerText);
        setStateOption({ option: false, remove: true })
    }
    function getValue() {
        if (stateOption.option) {
            setStateOption({ ...stateOption, option: false })
        } else setStateOption({ ...stateOption, option: true })

    }
    function removeTheme() {
        setReplaceOptionName('Choose a theme');
        setStateOption({ option: false, remove: false })
        setChooseTheme('');
    }
    return (
        <div className={cl.select} >
            <div onClick={getValue} id='select1' className={cl.title}>
                <div onClick={getValue} id='select2' className={cl.selectValue}>{replaceOptionName}</div>
                <div className={cl.selectIcon}><IconSelect /></div>
            </div>
            {stateOption.remove ? <div id='select3' onClick={removeTheme} className={cl.removeTheme}>&times;</div> : ''}


            <CSSTransition
                in={stateOption.option}
                timeout={220}
                classNames="stateOption"
                mountOnEnter
                unmountOnExit
            >
                {state => <SetOptions state={state} className={stateOption.option} selectOptions={selectOptions} replaceOption={replaceOption} />}
            </CSSTransition>
        </div>
    )
};
export default MySelect;