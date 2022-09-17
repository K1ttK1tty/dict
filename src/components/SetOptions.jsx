import React from 'react';
import cl from './UI/MySelect/MySelect.module.css'
const SetOptions = function ({ selectOptions,replaceOption }) {



    return (


        <div id='options' className={cl.options}>
            {selectOptions.map((option,id) => <div onClick={replaceOption} className={cl.optionsOption} key={option+id}>{option}</div>)}
        </div>

    )
};
export default SetOptions;