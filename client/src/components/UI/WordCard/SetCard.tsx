import { FC, Suspense, memo } from 'react';

import { useLocaleStorage } from '../../../hooks/useLocaleStorage';

import '../../../styles/Vocabulary.css';

import { ISetCards } from './WordCardModel';

import Card from './Card';

const SetCards: FC<ISetCards> = memo(function ({
    Cards,
    stale,
    modalChangeCard,
    setIsEditCardModal,
    selectedColorOrNewLabel,
}) {
    const [isTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
    const notRendered = stale ? '' : '';
    // const notRendered = stale ? 'notRenderedYet' : '';
    const cardsPosition = isTwoColumns ? `CardsPosition ${notRendered}` : notRendered;
    return (
        <div className={cardsPosition}>
            <Suspense>
                {Cards.map((card, index) => (
                    <Card
                        modalChangeCard={modalChangeCard}
                        card={card}
                        key={Math.random() + card.word}
                        index={index}
                        setIsEditCardModal={setIsEditCardModal}
                        selectedColorOrNewLabel={selectedColorOrNewLabel}
                    />
                ))}
            </Suspense>
        </div>
    );
});
export default SetCards;
