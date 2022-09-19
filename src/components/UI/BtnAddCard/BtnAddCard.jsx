import React from 'react';
import cl from './BtnAddCard.module.css'
const BtnAddCard = function ({ children, style, ...props }) {
    return (
        <button style={style} {...props} className={cl.btnAddCard}>{children}</button>
    )
};
export default BtnAddCard;