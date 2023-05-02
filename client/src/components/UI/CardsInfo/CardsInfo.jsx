import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { setToggleWordsOrder } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const CardsInfo = function ({ cards }) {
    const dispatch = useDispatch();
    return (
        <>
            <div className='wordsCount'>Всего слов: {cards.length} </div>
            <div className='inputOrder'>
                Алфавитный порядок:
                <input
                    defaultChecked={true}
                    onChange={() => dispatch(setToggleWordsOrder())}
                    type="checkbox"
                />
            </div>
        </>
    )
};
export default CardsInfo;