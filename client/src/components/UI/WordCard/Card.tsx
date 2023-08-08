import { FC, Fragment, createElement } from 'react';
import { isMobile } from 'react-device-detect';

import { updatedCards } from '../../../functions/UpdateCards';
import { switchFavorite } from '../../../functions/changeFavoriteCard';
import { editWord } from '../../../functions/editWord';
import { removeCard } from '../../../functions/removeCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useLocaleStorage } from '../../../hooks/useLocaleStorage';

import styles from './WordCard.module.css';

import { colours, isNewLabel } from '../../../globalConsts/globalConsts';

import { setCards } from '../../../store/reducers/authorization/Authorization/AuthSlice';
import { ICard } from '../../../store/storeModels';

import { TColorsOnCard } from '../../../models/models';
import { ICardProps, TSetNewColor } from './WordCardModel';

import FavoriteIcon from '../../../pages/Icons/FavoriteIcon';
import IconEdit from './icons/IconEdit';
import IconRemove from './icons/IconRemove';

const Card: FC<ICardProps> = function ({ card, index, modalChangeCard, setIsEditCardModal, selectedColorOrNewLabel }) {
    const dispatch = useAppDispatch();
    const { cards, user, data, currentDictionary, selectOptions } = useAppSelector(state => state.AuthSlice);
    const { searchWord, isSearchByWord } = useAppSelector(state => state.upMenu);
    const cardColorMark = [styles.colorMark, colours.get(card.color)].join(' ');
    const [isTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
    const [isColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const [showNewLabel] = useLocaleStorage('showNewLabel', true);
    const [hideTranslate] = useLocaleStorage('hideTranslation', false);
    const showLabel = showNewLabel && isNewLabel(card.time);
    const openModalInMobile = isMobile
        ? () => editWord(card, index, setIsEditCardModal, modalChangeCard, dispatch)
        : undefined;
    const cardClassName = isTwoColumns ? styles.card : [styles.card, styles.cardOneColumn].join(' ');

    const nextColour = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const element = e.target as HTMLButtonElement;
        let color: TColorsOnCard;
        if (element.classList.contains(styles.red)) color = 'orange';
        else if (element.classList.contains(styles.orange)) color = 'green';
        else color = 'red';
        const newCards = setNewColor(cards, card.id, color);
        dispatch(setCards(newCards));
        updatedCards(currentDictionary, user.email, data, newCards, selectOptions, dispatch);
    };
    const setNewColor: TSetNewColor = (cards, id, color) => {
        const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
        newCards.map(oneCard => {
            if (oneCard.id === id) {
                oneCard.color = color;
            }
            return oneCard;
        });
        return newCards;
    };
    const coloringLetters = (word: string) => {
        const arrayOfReactElements: React.ReactElement[] = [];
        const regExpression = new RegExp(searchWord, 'i');
        const array = word.split(regExpression);
        let beginningOfArray = regExpression.exec(word)?.index;
        array.forEach((element, index) => {
            arrayOfReactElements.push(createElement('span', { className: '' }, element));
            if (index === array.length - 1) return arrayOfReactElements;
            const stringWithSpace = regExpression.exec(word.slice(beginningOfArray))?.[0].split(' ');
            stringWithSpace?.forEach((elem, index) => {
                arrayOfReactElements.push(createElement('span', { className: styles.coloringLetters }, elem));
                if (index !== stringWithSpace.length - 1) {
                    arrayOfReactElements.push(createElement('span', { className: '' }, ' '));
                }
            });
            beginningOfArray = index + searchWord.length;
        });
        return arrayOfReactElements;
    };
    const translate =
        (!isSearchByWord && searchWord.length)
            ? coloringLetters(card.translate).map(elem => (
                  <Fragment key={card.translate + index + Math.random()}>{elem}</Fragment>
              ))
            : card.translate;
    return (
        <div
            data-testid="cards"
            onClick={openModalInMobile}
            onMouseDown={e => e.stopPropagation()}
            className={cardClassName}
        >
            <h4 className={styles.word}>
                {searchWord.length
                    ? coloringLetters(card.word).map((elem, index) => (
                          <Fragment key={card.word + index + Math.random()}>{elem}</Fragment>
                      ))
                    : card.word}
            </h4>
            {<p className={styles.translate}>{!(hideTranslate && selectedColorOrNewLabel !== null) && translate}</p>}
            <button
                className={isMobile ? styles.removeIcon : [styles.favorite, styles.icon].join(' ')}
                onClick={e => {
                    e.preventDefault();
                    switchFavorite(cards, card.id, currentDictionary, selectOptions, user.email, data, dispatch);
                }}
            >
                <FavoriteIcon isFavorite={card.favorite} />
            </button>
            <button
                onClick={() => editWord(card, index, setIsEditCardModal, modalChangeCard, dispatch)}
                className={isMobile ? styles.removeIcon : [styles.edit, styles.icon].join(' ')}
            >
                <IconEdit />
            </button>
            <button
                onClick={() => removeCard(card.id, cards, user.email, data, currentDictionary, selectOptions, dispatch)}
                className={isMobile ? styles.removeIcon : [styles.remove, styles.icon].join(' ')}
            >
                <IconRemove />
            </button>
            <div className={styles.cardInfo} onClick={e => e.stopPropagation()}>
                {isColorsInCards && <button className={cardColorMark} onMouseDown={nextColour} />}
                {showLabel && (
                    <div className={styles.new}>
                        <div className={styles.font}>n</div>
                        <div className={styles.font}>e</div>
                        <div className={styles.font}>w</div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Card;
