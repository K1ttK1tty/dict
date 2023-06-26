import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
export const overrideThemesInCards = (cards: ICard[], oldTheme: string, newTheme: string) => {
    const result = [...cards].map(card => {
        if (card.theme === oldTheme) {
            return { id: card.id, word: card.word, translate: card.translate, theme: newTheme, note: card.note };
        }
        return card;
    });
    return result;
};