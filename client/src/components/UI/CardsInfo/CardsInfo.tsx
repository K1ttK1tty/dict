import { FC, memo } from 'react';
// components
import Checkbox from '../Checkbox/Checkbox';
// styles
import style from './CardsInfo.module.css';
// redux
import { useAppSelector } from '../../../hooks/redux';
// types
interface ICardsInfo {
    isMovedBlock?: boolean;
    doubleRowCards: boolean;
    setDoubleRowCards: (state: boolean) => void;
    wordsOrder: boolean;
    setWordsOrder: (state: boolean) => void;
}
const CardsInfo: FC<ICardsInfo> = memo(function (
    {
        isMovedBlock,
        doubleRowCards,
        setDoubleRowCards,
        wordsOrder,
        setWordsOrder
    }
) {
    const { cards } = useAppSelector(state => state.AuthSlice);
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
                    defaultChecked={wordsOrder}
                    id={'cardsInfoID'}
                    dinamicClassName={isMovedBlock ? style.input : ''}
                    callback={() => setWordsOrder(!wordsOrder)}
                />
            </div>
            <div className={[wordsOrderClass, style.mb18].join(' ')}>
                В две колонки:
                <Checkbox
                    id={'oneOrTwoCardsColumnsID'}
                    defaultChecked={doubleRowCards}
                    dinamicClassName={isMovedBlock ? style.input : ''}
                    callback={() => setDoubleRowCards(!doubleRowCards)}
                />
            </div>
        </>
    );
});
export default CardsInfo;