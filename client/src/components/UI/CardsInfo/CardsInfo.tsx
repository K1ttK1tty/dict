import { FC, memo } from 'react';
// components
import Checkbox from '../Checkbox/Checkbox';
// styles
import style from './CardsInfo.module.css';
// redux
import { useAppSelector } from '../../../hooks/redux';
// types
import { ICardsInfo } from './CardsInfoModel';
const CardsInfo: FC<ICardsInfo> = memo(function (
    {
        isMovedBlock,
        isTwoColumns,
        setIsTwoColumns,
        order,
        setOrder
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
                    defaultChecked={order}
                    id={'cardsInfoID'}
                    dinamicClassName={isMovedBlock ? style.input : ''}
                    callback={() => setOrder(!order)}
                />
            </div>
            <div className={[wordsOrderClass, style.mb18].join(' ')}>
                В две колонки:
                <Checkbox
                    id={'oneOrTwoCardsColumnsID'}
                    defaultChecked={isTwoColumns}
                    dinamicClassName={isMovedBlock ? style.input : ''}
                    callback={() => setIsTwoColumns(!isTwoColumns)}
                />
            </div>
        </>
    );
});
export default CardsInfo;