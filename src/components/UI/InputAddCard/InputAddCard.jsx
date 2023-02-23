import React from 'react';
import cl from './inputAddCard.module.css'
//redux
import { useDispatch } from 'react-redux';
const InputAddCard = function ({ inputValue, placeholder, disabled, style, modalAdd, modalChangeCard, setValue }) {
    const dispatch = useDispatch();
    const element = modalAdd ? modalAdd : modalChangeCard;
    // const element = modalChangeCard;

    return (
        <input
            ref={element}
            disabled={disabled}
            placeholder={placeholder}
            style={style}
            className={cl.www}
            value={inputValue}
            onChange={e => setValue(e.target.value)}
        />
    )
};
export default InputAddCard;