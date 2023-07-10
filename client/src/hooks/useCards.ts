import { useMemo } from 'react';
// functions
import { isNotEmpty } from '../functions/isNotEmpty';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
import { TUseCards, TUseSearchByWord, TUseSelectedThemes, TUseSortedCards } from '../models/models';
export const useSordetCard: TUseSortedCards = (Cards, toggleWordsOrder) => {
    const sordetCard = useMemo(() => {
        if (!toggleWordsOrder) return Cards;
        return Cards.sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards, toggleWordsOrder]);
    return sordetCard;
};
export const useSelectedThemes: TUseSelectedThemes = (Cards, selectedTheme, toggleWordsOrder) => {
    const sordetCard = useSordetCard(Cards, toggleWordsOrder);
    const selectedThemes = useMemo(() => {
        if (!selectedTheme) return sordetCard;
        return sordetCard.filter((card: ICard) => card.theme == selectedTheme);
    }, [selectedTheme, sordetCard]);

    return selectedThemes;
};

export const useCards: TUseCards = (
    Cards,
    searchWord,
    selectedTheme,
    toggleWordsOrder,
    isSearchByWord,
    isLetterCaseInclude
) => {
    const iterableCards = Cards.length ? [...Cards] : [];
    const selectedThemes = useSelectedThemes(iterableCards, selectedTheme, toggleWordsOrder);
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
    }, [word, array.length, array]);
    return result;
};