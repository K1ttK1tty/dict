import React from 'react';
import cl from './MySelect.module.css'
import { useState } from 'react';
import SetOptions from '../../SetOptions';
import { CSSTransition } from 'react-transition-group';
import IconSelect from './IconSelect';
const MySelect = function ({ chooseTheme, setChooseTheme, selectOptions, setSelectOptions}) {


    // for (let index = 0; index < selectOptions.length; index++) {
    //     const element = selectOptions[index];
    // }

    const [stateOption, setStateOption] = useState({ option: false, remove: false })
    const [replaceOptionName, setReplaceOptionName] = useState('Choose a theme')

    function replaceOption(el) {
        setReplaceOptionName(el.target.innerText);
        setChooseTheme(el.target.innerText);
        setStateOption({ option: false, remove: true })
    }
    function getValue() {
        if (stateOption.option) {
            setStateOption({ option: false, remove: false })
        } else setStateOption({ ...stateOption, option: true })

    }
    function removeTheme() {
        setReplaceOptionName('Choose a theme');
        setChooseTheme('');
        setStateOption({ ...stateOption, remove: false })
    }
    return (
        <div className={cl.select}>
            <div onClick={getValue} className={cl.title}>
                <div className={cl.selectValue}>{replaceOptionName}</div>
                <div className={cl.selectIcon}><IconSelect /></div>
            </div>
            {stateOption.remove ? <div onClick={removeTheme} className={cl.removeTheme}>&times;</div> : ''}






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