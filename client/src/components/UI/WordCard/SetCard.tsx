import { FC, memo, Suspense } from 'react';
import Card from './Card';
// hook
import { useLocaleStorage } from '../../../hooks/useLocaleStorage';
// style
import '../../../styles/Vocabulary.css';
// types
import { ISetCards } from './WordCardModel';
const SetCards: FC<ISetCards> = memo(function (
    {
        Cards,
        stale,
        modalChangeCard,
        setIsEditCardModal,
        selectedColorOrNewLabel
    }) {
    const [isTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
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
                            setIsEditCardModal={setIsEditCardModal}
                            selectedColorOrNewLabel={selectedColorOrNewLabel}
                        />
                    )
                }
            </Suspense>
        </div>
    );
});
export default SetCards;