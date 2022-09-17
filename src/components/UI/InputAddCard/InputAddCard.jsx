import React from 'react';
import cl from './inputAddCard.module.css'
const InputAddCard = function ({ inputValue, setInputValue, placeholder }) {



    return (
        <input
            placeholder={placeholder}
            className={cl.www}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}

        ></input>
    )
};
export default InputAddCard;