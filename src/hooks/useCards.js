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
        return sordetCard.filter(card => card.word.toLowerCase().includes(chooseTheme.toLowerCase())); // ???перепутаны местами
    }, [chooseTheme, Cards, toggleWordsOrder]);
    return selectedThemes
}

export const useCards = (Cards, searchWord, chooseTheme, toggleWordsOrder) => {
    const selectedThemes = useSelectedThemes(Cards, chooseTheme, toggleWordsOrder)

    const selectedAndSearchedWord = useMemo(() => {
        return selectedThemes.filter(card => card.theme.toLowerCase().includes(searchWord.toLowerCase())); // ???перепутаны местами
    }, [selectedThemes, searchWord, toggleWordsOrder])

    return selectedAndSearchedWord
}
