// libs
import { FC } from 'react';
import { isMobile } from 'react-device-detect';
// components
import IconRemove from './icons/IconRemove';
import IconEdit from './icons/IconEdit';
// functions
import { removeCard } from '../../../functions/removeCard';
import { editWord } from '../../../functions/editWord';
// consts
import { colours, isNew } from './CardConsts';
// styles
import styles from './WordCard.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCards } from '../../../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateCards } from '../../../store/reducers/authorization/Authorization/ActionCreator';
// types
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
import { ICardProps, TSetNewColor } from './WordCardModel';
const Card: FC<ICardProps> = function ({ card, index, modalChangeCard, isTwoColumns, isColorsOnCards }) {
    const dispatch = useAppDispatch();
    const { cards, user } = useAppSelector(state => state.AuthSlice);
    const cardColorMark = [styles.colorMark, colours.get(card.color)].join(' ');

    const openModalInMobile = isMobile
        ? () => editWord(card, index, modalChangeCard, dispatch)
        : undefined;
    const cardClassName = isTwoColumns
        ? styles.card :
        [styles.card, styles.cardOneColumn].join(' ');

    const nextColour = (e: React.MouseEvent<HTMLButtonElement>) => {
        const element = e.target as HTMLButtonElement;
        let color: 'green' | 'red' | 'orange';
        if (element.classList.contains(styles.red)) {
            color = 'orange';
        } else if (element.classList.contains(styles.orange)) {
            color = 'green';
        } else {
            color = 'red';
        }
        const newCards = setNewColor(cards, card.id, color);
        dispatch(setCards(newCards));
        dispatch(UpdateCards({ email: user.email, cards: newCards }));
    };

    const setNewColor: TSetNewColor = (cards, id, color) => {
        const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
        newCards.map(card => {
            if (card.id === id) {
                card.color = color;
            }
        });
        return newCards;
    };

    return (
        <div onClick={openModalInMobile} className={cardClassName}>
            <h4 className={styles.word}>{card.word}</h4>
            <p className={styles.translate}>{card.translate}</p>
            <button
                onClick={() => editWord(card, index, modalChangeCard, dispatch)}
                className={
                    isMobile
                        ? styles.removeIcon
                        : styles.edit
                }
            >
                <IconEdit />
            </button>
            <div
                onClick={() => removeCard(card.id, cards, user.email, dispatch)}
                className={isMobile
                    ? styles.removeIcon
                    : styles.remove
                }
            >
                <IconRemove />
            </div>
            <div className={styles.cardInfo} onClick={e => e.stopPropagation()}>

                {
                    isColorsOnCards &&
                    <button
                        className={cardColorMark}
                        onMouseDown={nextColour}
                    >
                    </button>
                }

                {
                    isNew(card.time) &&
                    <div className={styles.new}>
                        <div className={styles.font}>n</div>
                        <div className={styles.font}>e</div>
                        <div className={styles.font}>w</div>
                    </div>
                }
            </div>
        </div>
    );
};
export default Card;