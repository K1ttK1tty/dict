import { useMemo } from "react";
export const useSordetCard = (Cards, toggleWordsOrder) => {

    const sordetCard = useMemo(() => {
        if (!toggleWordsOrder) return Cards
        return Cards.sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards, toggleWordsOrder])
    return sordetCard;
}

export const useSelectedThemes = (Cards, chooseTheme, toggleWordsOrder) => {
    const sordetCard = useSordetCard(Cards, toggleWordsOrder)
    const selectedThemes = useMemo(() => {
        if (!chooseTheme) return sordetCard
        return sordetCard.filter(card => card.theme.toLowerCase() == chooseTheme.toLowerCase());
    }, [chooseTheme, Cards]);
    return selectedThemes
}

export const useCards = (Cards, searchWord, chooseTheme, toggleWordsOrder) => {
    const iterableCards = Cards.length ? [...Cards] : []

    const selectedThemes = useSelectedThemes(iterableCards, chooseTheme, toggleWordsOrder)

    const selectedAndSearchedWord = useMemo(() => {
        return selectedThemes.filter(card => card.word.toLowerCase().includes(searchWord.toLowerCase()));
    }, [selectedThemes, searchWord])

    return selectedAndSearchedWord
}
