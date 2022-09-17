import React from 'react';
import cl from './BtnAddCard.module.css'
const BtnAddCard = function ({ children, ...props }) {

    return (
        <button {...props} className={cl.btnAddCard}>{children}</button>
    )
};
export default BtnAddCard;