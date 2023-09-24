import { FC, Suspense, memo, useEffect, useState } from 'react';

import { useLocaleStorage } from '../../../hooks/useLocaleStorage';

import '../../../styles/Vocabulary.css';

import { ICard } from '../../../store/storeModels';

import { ISetCards } from './WordCardModel';

import BtnAddCard from '../BtnAddCard/BtnAddCard';
import Card from './Card';

const SetCards: FC<ISetCards> = memo(function ({
    Cards,
    stale,
    modalChangeCard,
    setIsEditCardModal,
    selectedColorOrNewLabel,
}) {
    const [numberOfCards, setNumberOfCards] = useState<number>(50);
    const [oldCoordinates, setOldCoordinates] = useState<number>(0);
    const [isTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
    const notRendered = stale ? '' : '';
    // const notRendered = stale ? 'notRenderedYet' : '';
    const cardsPosition = isTwoColumns ? `CardsPosition ${notRendered}` : notRendered;
    const portionOfCards: ICard[] = [...Cards].slice(0, numberOfCards);
    useEffect(() => {
        if (numberOfCards > 50) {
            if (document) {
                window.document.body.scrollTo({ top: oldCoordinates, left: 0, behavior: 'instant' });
            }
        }
    }, [numberOfCards, oldCoordinates]);
    return (
        <div data-testid="setCardComponent" className={cardsPosition}>
            <Suspense>
                {portionOfCards.map((card, index) => (
                    <Card
                        modalChangeCard={modalChangeCard}
                        card={card}
                        key={Math.random() + card.word}
                        index={index}
                        setIsEditCardModal={setIsEditCardModal}
                        selectedColorOrNewLabel={selectedColorOrNewLabel}
                    />
                ))}
                {portionOfCards.length !== Cards.length && (
                    <>
                        <BtnAddCard
                            onMouseDown={e => e.stopPropagation()}
                            onClick={e => {
                                e.stopPropagation();
                                setNumberOfCards(prev => prev + 50);
                                setOldCoordinates(document.body.scrollHeight - document.body.clientHeight);
                            }}
                            dinamicclassname="showMoreCardsButton"
                            children="Показать еще"
                        />
                    </>
                )}
            </Suspense>
        </div>
    );
});
export default SetCards;
