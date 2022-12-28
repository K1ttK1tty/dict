import React from 'react';
import cl from './inputAddCard.module.css'
const InputAddCard = function ({ inputValue, setInputValue, placeholder, disabled, style, modalAdd, modalChangeCard, ...props }) {
    const element = modalAdd ? modalAdd : modalChangeCard;
    return (
        <input
            ref={element}
            disabled={disabled}
            placeholder={placeholder}
            style={style}
            className={cl.www}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
    )
};
export default InputAddCard;