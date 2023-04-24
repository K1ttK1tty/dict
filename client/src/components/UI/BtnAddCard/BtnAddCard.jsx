import React from 'react';
import moduleStyles from './BtnAddCard.module.css'
const BtnAddCard = function ({ children, style, noClick, aria, dinamicclassname, ...props }) {
    return (
        <button
            aria-label={aria}
            style={style}
            {...props}
            className={[moduleStyles.btnAddCard, dinamicclassname, noClick].join(' ')}>
            {children}
        </button>
    )
};
export default BtnAddCard;