import { FC, memo } from 'react';

import { cutLongLine } from '../../../functions/cutLongLine';
import { useAppSelector } from '../../../hooks/redux';

import style from './CardsInfo.module.css';

import { isNewLabel } from '../../../globalConsts/globalConsts';

import { ICardsInfo } from './CardsInfoModel';

import { getSelectedTheme } from '../../../Tests/StoreTests/Selectors';
import BtnAddCard from '../BtnAddCard/BtnAddCard';

const CardsInfo: FC<ICardsInfo> = memo(function ({ isMovedBlock, setIsDictionaryModal, selectedColorOrNewLabel }) {
    const { cards, currentDictionary } = useAppSelector(state => state.AuthSlice);
    const totalWordsClass: string = isMovedBlock ? [style.wordsCount, style.textCenter].join(' ') : style.wordsCount;

    const buttonStyles = isMovedBlock ? [style.button, style.colorAndShadowBlack].join(' ') : style.button;
    const selectedTheme = useAppSelector(getSelectedTheme);
    let themeOrColor = false;
    let numberOfCards = 0;
    if (selectedTheme) {
        themeOrColor = true;
        numberOfCards = [...cards].filter(card => card.theme === selectedTheme).length;
    } else if (selectedColorOrNewLabel !== null) {
        themeOrColor = true;
        if (selectedColorOrNewLabel === 'new') {
            numberOfCards = [...cards].filter(card => isNewLabel(card.time)).length;
        } else numberOfCards = [...cards].filter(card => card.color === selectedColorOrNewLabel).length;
    }
    const wordsInThemeOfColor = themeOrColor ? totalWordsClass : [totalWordsClass,style.hide].join(' ');
    return (
        <>
            <div className={totalWordsClass}>
                Словарь:
                <BtnAddCard
                    dinamicclassname={buttonStyles}
                    children={cutLongLine(currentDictionary, 24)}
                    onMouseDown={e => {
                        e.stopPropagation();
                        setIsDictionaryModal(true);
                    }}
                />
            </div>
            <div className={totalWordsClass}>Всего слов: {cards.length}</div>
            <div className={wordsInThemeOfColor}>Слов в теме/по отметке: {numberOfCards}</div>
        </>
    );
});
export default CardsInfo;
