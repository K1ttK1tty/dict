import { FC, memo } from 'react';
// styles
import style from './CardsInfo.module.css';
// redux
import { useAppSelector } from '../../../hooks/redux';
// types
import { ICardsInfo } from './CardsInfoModel';
const CardsInfo: FC<ICardsInfo> = memo(function (
    {
        isMovedBlock,
    }
) {
    const { cards } = useAppSelector(state => state.AuthSlice);
    const totalWordsClass: string = isMovedBlock
        ? [style.wordsCount, style.textCenter].join(' ')
        : style.wordsCount;

    return (
        <>
            <div className={totalWordsClass}>Всего слов: {cards.length} </div>
        </>
    );
});
export default CardsInfo;