import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
export interface IColorObject {
    light: {
        elements: HTMLElement[];
        colors: string[];
    };
    dark: {
        elements: HTMLElement[];
        colors: string[];
    };
}
export interface IVocabulary {
    isColorsOnCards: boolean;
    setIsColorsInCards: (state: boolean) => void;
}
export interface ISetOptions {
    replaceOption: (element: React.MouseEvent<HTMLDivElement>) => void;
    setIsModal: (state: boolean) => void;
}
export type TUseLocaleStorage = (name: string, state: boolean) => [boolean, (state: boolean) => void];
export type TUseSortedCards = (Cards: ICard[], toggleWordsOrder: boolean) => ICard[];
export type TUseSelectedThemes = (Cards: ICard[], selectedTheme: string, toggleWordsOrder: boolean) => ICard[];
export type TUseCards = (
    Cards: ICard[],
    searchWord: string,
    selectedTheme: string,
    toggleWordsOrder: boolean,
    isSearchByWord: boolean,
    isLetterCaseInclude: boolean
) => ICard[];
export type TUseSearchByWord = (array: string[], word: string) => string[];
export interface IGames {
    isColorsInCards: boolean;
}
    export type TPrevState = { testByWord: boolean, currentColor: string };
