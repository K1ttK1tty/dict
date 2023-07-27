import { useMemo } from 'react';
// functions
import { isNotEmpty } from '../functions/isNotEmpty';
import { isNewLabel } from '../globalConsts/globalConsts';
// types
import { ICard } from '../store/storeModels';
import { TUseCards, TUseSearchByWord, TUseSelectedThemes, TUseSortedCards } from '../models/models';

const useSordetCard: TUseSortedCards = (Cards, toggleWordsOrder) => {
    const sordetCard = useMemo(() => {
        if (!toggleWordsOrder) return Cards;
        return [...Cards].sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards, toggleWordsOrder]);
    return sordetCard;
};
const useSelectedThemes: TUseSelectedThemes = (Cards, selectedTheme, toggleWordsOrder, selectedColor) => {
    const sordetCard = useSordetCard(Cards, toggleWordsOrder);
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
    toggleWordsOrder,
    isSearchByWord,
    isLetterCaseInclude,
    selectedColor
) => {
    const iterableCards = Cards.length ? [...Cards] : [];
    const selectedThemes = useSelectedThemes(iterableCards, selectedTheme, toggleWordsOrder, selectedColor);
    const selectedAndSearchedWord = useMemo(() => {
        if (isSearchByWord) {
            if (isLetterCaseInclude) {
                return selectedThemes.filter((card: ICard) =>
                    card.word.includes(searchWord));
            }
            return selectedThemes.filter((card: ICard) =>
                card.word.toLowerCase().includes(searchWord.toLowerCase()));
        } else {
            if (isLetterCaseInclude) {
                return selectedThemes.filter((card: ICard) =>
                    card.translate.includes(searchWord));
            }
            return selectedThemes.filter((card: ICard) =>
                card.translate.toLowerCase().includes(searchWord.toLowerCase()));
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