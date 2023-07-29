import { FC } from 'react';

import moduleStyles from './BtnAddCard.module.css';

import { IBtnProps } from './BtnAddCardModel';

const BtnAddCard: FC<IBtnProps> = function ({ children, style, noClick, aria, dinamicclassname, type, ...props }) {
    return (
        <button
            aria-label={aria}
            style={style}
            type={type}
            {...props}
            className={[moduleStyles.btnAddCard, dinamicclassname, noClick].join(' ')}
        >
            {children}
        </button>
    );
};
export default BtnAddCard;
