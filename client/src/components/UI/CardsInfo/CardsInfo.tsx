import { FC, memo } from 'react';
// functions
import { cutLongLine } from '../../../functions/cutLongLine';
// styles
import style from './CardsInfo.module.css';
// redux
import { useAppSelector } from '../../../hooks/redux';
// types
import { ICardsInfo } from './CardsInfoModel';
const CardsInfo: FC<ICardsInfo> = memo(function ({ isMovedBlock, setIsDictionaryModal }) {
    const { cards, currentDictionary } = useAppSelector(state => state.AuthSlice);
    const totalWordsClass: string = isMovedBlock
        ? [style.wordsCount, style.textCenter].join(' ')
        : style.wordsCount;
    return (
        <>
            <div className={totalWordsClass}>
                Словарь:
                <button onMouseDown={e => {
                    e.stopPropagation();
                    setIsDictionaryModal(true);
                }}>
                    {cutLongLine(currentDictionary, 24)}
                </button>
            </div>
            <div className={totalWordsClass}>Слов: {cards.length}</div>
        </>
    );
});
export default CardsInfo;