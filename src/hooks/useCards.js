import { useMemo } from "react";
export const useSordetCard = (Cards) => {
    const sordetCard = useMemo(() => {
        return Cards.sort((a, b) => a.word.localeCompare(b.word));
    }, [Cards])
    return sordetCard;
}

export const useSelectedThemes = (Cards, chooseTheme) => {
    const sordetCard = useSordetCard(Cards)

    const selectedThemes = useMemo(() => {
        return [...sordetCard].filter(card => card.theme.toLowerCase().includes(chooseTheme.toLowerCase()));
    }, [chooseTheme, Cards]);
    return selectedThemes
}

export const useCards = (Cards,searchWord, chooseTheme) => {
    const selectedThemes = useSelectedThemes(Cards, chooseTheme)

    const selectedAndSearchedWord = useMemo(() => {
        return [...selectedThemes].filter(card => card.word.toLowerCase().includes(searchWord.toLowerCase()));
    }, [selectedThemes, searchWord])

    return selectedAndSearchedWord
}





