import { useMemo } from 'react';

import { isNotEmpty } from '../functions/isNotEmpty';

import { isNewLabel } from '../globalConsts/globalConsts';

import { ICard } from '../store/storeModels';

import { TUseCards, TUseSearchByWord, TUseSelectedThemes, TUseSortedCards } from '../models/models';

import { useLocaleStorage } from './useLocaleStorage';

const useSordetCard: TUseSortedCards = (Cards) => {
    const [order] = useLocaleStorage('order', true);
    const sordetCard = useMemo(() => {
        const cards = [...Cards].reverse();
        if (!order) return cards;
        return cards.sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards, order]);
    return sordetCard;
};
const useSelectedThemes: TUseSelectedThemes = (Cards, selectedTheme, selectedColor) => {
    const sordetCard = useSordetCard(Cards);
    const selectedThemes = useMemo(() => {
        if (!selectedTheme && !selectedColor) return sordetCard;
        if (selectedColor === 'Избранное') {
            return sordetCard.filter((card: ICard) => card.favorite === true);
        }
        if (selectedColor === 'new') {
            return sordetCard.filter((card: ICard) => isNewLabel(card.time));
        }
        if (selectedColor) {
            return sordetCard.filter((card: ICard) => card.color === selectedColor);
        }
        return sordetCard.filter((card: ICard) => card.theme == selectedTheme);
    }, [selectedTheme, sordetCard, selectedColor]);

    return selectedThemes;
};
export const useCards: TUseCards = (
    Cards,
    searchWord,
    selectedTheme,
    isSearchByWord,
    isLetterCaseInclude,
    selectedColor,
) => {
    const iterableCards = Cards.length ? [...Cards] : [];
    const selectedThemes = useSelectedThemes(iterableCards, selectedTheme, selectedColor);
    const selectedAndSearchedWord = useMemo(() => {
        if (isSearchByWord) {
            if (isLetterCaseInclude) {
                return selectedThemes.filter((card: ICard) => card.word.includes(searchWord));
            }
            return selectedThemes.filter((card: ICard) => card.word.toLowerCase().includes(searchWord.toLowerCase()));
        } else {
            if (isLetterCaseInclude) {
                return selectedThemes.filter((card: ICard) => card.translate.includes(searchWord));
            }
            return selectedThemes.filter((card: ICard) =>
                card.translate.toLowerCase().includes(searchWord.toLowerCase()),
            );
        }
    }, [selectedThemes, searchWord, isSearchByWord, isLetterCaseInclude]);
    return selectedAndSearchedWord;
};
export const useSearchByWord: TUseSearchByWord = (array, word) => {
    const result = useMemo(() => {
        if (isNotEmpty(word)) {
            const newArray = [...array].filter(element => element.toLowerCase().includes(word.toLowerCase()));
            return newArray;
        }
        return array;
    }, [word, array]);
    // }, [word, array.length, array]);
    return result;
};
