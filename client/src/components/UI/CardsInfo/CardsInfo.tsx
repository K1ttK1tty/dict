import { FC, memo } from 'react';
// components
import BtnAddCard from '../BtnAddCard/BtnAddCard';
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
                <BtnAddCard
                    dinamicclassname={style.button}
                    children={cutLongLine(currentDictionary, 24)}
                    onMouseDown={e => {
                        e.stopPropagation();
                        setIsDictionaryModal(true);
                    }}
                />
            </div>
            <div className={totalWordsClass}>Слов: {cards.length}</div>
        </>
    );
});
export default CardsInfo;