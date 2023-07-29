import { FC } from 'react';
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
        if (element.classList.contains(styles.red)) {
            color = 'orange';
        } else if (element.classList.contains(styles.orange)) {
            color = 'green';
        } else {
            color = 'red';
        }
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
    return (
        <div onClick={openModalInMobile} onMouseDown={e => e.stopPropagation()} className={cardClassName}>
            <h4 className={styles.word}>{card.word}</h4>
            {
                <p className={styles.translate}>
                    {!(hideTranslate && selectedColorOrNewLabel !== null) && card.translate}
                </p>
            }
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
