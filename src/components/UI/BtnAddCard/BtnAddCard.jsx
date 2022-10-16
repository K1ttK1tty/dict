import React from 'react';
import cl from './BtnAddCard.module.css'
const BtnAddCard = function ({ children, style,noClick, ...props }) {
    return (
        <button style={style} {...props} className={[cl.btnAddCard,noClick].join(' ')}>{children}</button>
    )
};
export default BtnAddCard;