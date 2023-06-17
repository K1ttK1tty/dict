import { useMemo } from 'react';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
export const useSordetCard = (Cards: ICard[], toggleWordsOrder: boolean) => {
    const sordetCard = useMemo(() => {
        if (!toggleWordsOrder) return Cards;
        return Cards.sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards, toggleWordsOrder]);

    return sordetCard;
};
export const useSelectedThemes = (Cards: ICard[], chooseTheme: string, toggleWordsOrder: boolean) => {
    const sordetCard = useSordetCard(Cards, toggleWordsOrder);
    const selectedThemes = useMemo(() => {
        if (!chooseTheme) return sordetCard;
        return sordetCard.filter((card: ICard) => card.theme.toLowerCase() == chooseTheme.toLowerCase());
    }, [chooseTheme, Cards]);

    return selectedThemes;
};
export const useCards = (Cards: ICard[], searchWord: string, chooseTheme: string, toggleWordsOrder: boolean) => {
    const iterableCards = Cards.length ? [...Cards] : [];
    const selectedThemes = useSelectedThemes(iterableCards, chooseTheme, toggleWordsOrder);
    const selectedAndSearchedWord = useMemo(() => {
        return selectedThemes.filter((card: ICard) => card.word.toLowerCase().includes(searchWord.toLowerCase()));
    }, [selectedThemes, searchWord]);

    return selectedAndSearchedWord;
};
