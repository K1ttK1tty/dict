import { FC, memo } from 'react';
import Card from './Card';
// style
import '../../../styles/Vocabulary.css';
// types
import { ISetCards } from './WordCardModel';
const SetCards: FC<ISetCards> = memo(function ({ Cards, modalChangeCard, isTwoColumns, isColorsOnCards }) {
    const cardsPosition = isTwoColumns ? 'CardsPosition' : '';
    return (
        <div className={cardsPosition}>
            {
                Cards.map((card, index) =>
                    < Card
                        modalChangeCard={modalChangeCard}
                        card={card}
                        key={Math.random() + card.word}
                        index={index}
                        isTwoColumns={isTwoColumns}
                        isColorsOnCards={isColorsOnCards}
                    />
                )
            }
        </div>
    );
});
export default SetCards;