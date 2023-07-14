import { FC, memo, Suspense } from 'react';
import Card from './Card';
// style
import '../../../styles/Vocabulary.css';
// types
import { ISetCards } from './WordCardModel';
const SetCards: FC<ISetCards> = memo(function (
    {
        Cards,
        stale,
        modalChangeCard,
        isTwoColumns,
        isColorsOnCards,
        setIsEditCardModal
    }) {
    const notRendered = stale ? 'notRenderedYet' : '';
    const cardsPosition = isTwoColumns ? `CardsPosition ${notRendered}` : notRendered;

    return (
        <div className={cardsPosition}>
            <Suspense>
                {
                    Cards.map((card, index) =>
                        < Card
                            modalChangeCard={modalChangeCard}
                            card={card}
                            key={Math.random() + card.word}
                            index={index}
                            isTwoColumns={isTwoColumns}
                            isColorsOnCards={isColorsOnCards}
                            setIsEditCardModal={setIsEditCardModal}
                        />
                    )
                }
            </Suspense>
        </div>
    );
});
export default SetCards;