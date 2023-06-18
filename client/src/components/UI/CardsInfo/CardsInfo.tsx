import { FC } from 'react';
// components
import Checkbox from '../Checkbox/Checkbox';
// styles
import style from './CardsInfo.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setToggleWordsOrder } from '../../../store/reducers/authorization/Authorization/AuthSlice';
// types
interface ICardsInfo {
    isMovedBlock?: boolean;
}
const CardsInfo: FC<ICardsInfo> = function ({ isMovedBlock }) {
    const dispatch = useAppDispatch();
    const { toggleWordsOrder, cards } = useAppSelector(state => state.AuthSlice);
    const totalWordsClass: string = isMovedBlock
        ? [style.wordsCount, style.textCenter].join(' ')
        : style.wordsCount;
    const wordsOrderClass: string = isMovedBlock
        ? [style.inputOrder, style.textCenter].join(' ')
        : style.inputOrder;
    return (
        <>
            <div className={totalWordsClass}>Всего слов: {cards.length} </div>
            <div className={wordsOrderClass}>
                Алфавитный порядок:
                <Checkbox
                    defaultChecked={toggleWordsOrder}
                    id={'cardsInfoID'}
                    dinamicClassName={ isMovedBlock? style.input : ''}
                    callback={() => dispatch(setToggleWordsOrder())}
                />
            </div>
        </>
    );
};
export default CardsInfo;