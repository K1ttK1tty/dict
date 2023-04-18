import React from 'react';
import cl from './inputAddCard.module.css'
const InputAddCard = function ({ inputValue, placeholder, disabled, style, modalAdd, modalChangeCard, setValue, dinamicclassname, type,}) {
    const element = modalAdd ? modalAdd : modalChangeCard;
    return (
        <input
            ref={element}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            style={style}
            className={[cl.www, dinamicclassname].join(' ')}
            value={inputValue}
            onChange={e => setValue(e.target.value)}
        />
    )
};
export default InputAddCard;