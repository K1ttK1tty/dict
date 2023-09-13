import { FC } from 'react';

import noSelectStyles from '../CardsControl/CardsControl.module.css';
import moduleStyles from './BtnAddCard.module.css';

import { IBtnProps } from './BtnAddCardModel';

const BtnAddCard: FC<IBtnProps> = function ({ children, style, noClick, aria, dinamicclassname, type, ...props }) {
    return (
        <button
            aria-label={aria}
            style={style}
            type={type}
            {...props}
            className={[moduleStyles.btnAddCard, noSelectStyles.noselect, dinamicclassname, noClick].join(' ')}
        >
            {children}
        </button>
    );
};
export default BtnAddCard;
