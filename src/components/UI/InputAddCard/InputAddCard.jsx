import React from 'react';
import cl from './inputAddCard.module.css'
const InputAddCard = function ({ inputValue, setInputValue, placeholder, additionClasses, disabled,style}) {

    return (
        <input
            disabled={disabled}
            placeholder={placeholder}
            style={style}
            className={cl.www}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        ></input>
    )
};
export default InputAddCard;