import { ToverrideThemesInCards } from './functoinModels';

export const overrideThemesInCards: ToverrideThemesInCards = (cards, oldTheme, newTheme) => {
    const result = [...cards].map(card => {
        if (card.theme === oldTheme) {
            return {
                id: card.id,
                word: card.word,
                translate: card.translate,
                theme: newTheme,
                note: card.note,
                time: card.time,
                color: card.color,
                favorite: card.favorite,
            };
        }
        return card;
    });
    return result;
};
