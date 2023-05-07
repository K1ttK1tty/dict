import React from 'react';
// styles
import style from './CardsInfo.module.css'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setToggleWordsOrder } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const CardsInfo = function ({ isMovedBlock }) {
    const dispatch = useDispatch();
    const { toggleWordsOrder, cards } = useSelector(state => state.AuthSlice);
    const totalWordsClass = isMovedBlock
        ? [style.wordsCount, style.textCenter].join(' ')
        : style.wordsCount
    const wordsOrderClass = isMovedBlock
        ? [style.inputOrder, style.textCenter].join(' ')
        : style.inputOrder
    return (
        <>
            <div className={totalWordsClass}>Всего слов: {cards.length} </div>
            <div className={wordsOrderClass}>
                Алфавитный порядок:
                <input
                    id={style.input}
                    defaultChecked={toggleWordsOrder}
                    onChange={() => dispatch(setToggleWordsOrder())}
                    type="checkbox"
                />
                <label htmlFor={style.input} className={style.label}></label>
            </div>
        </>
    )
};
export default CardsInfo;