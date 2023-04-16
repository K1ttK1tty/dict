import React from 'react';
import cl from './UI/MySelect/MySelect.module.css'
import { useSelector } from 'react-redux';
const SetOptions = function ({ replaceOption }) {
    const selectOptions = useSelector(state => state.AuthSlice.selectOptions)
    return (
        <div id='options' className={cl.options}>
            {selectOptions.map((option, id) =>
                <div onClick={replaceOption} className={cl.optionsOption} key={option + id}>
                    {option}
                </div>)}
        </div>
    )
};
export default SetOptions;