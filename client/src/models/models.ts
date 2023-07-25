import { ICard } from '../store/storeModels';
import { IOptionState } from '../store/storeModels';
import { TSelectColorOrNew } from '../components/UI/MySelect/MySelectModel';
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
    showNewLabel: boolean;
    isColorsInCards: boolean;
    isTwoColumns: boolean;
    isSelectOpen: IOptionState,
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    isAttached: TAttachedControls,
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>;
    order: boolean;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
export interface IStatistics {
    isColorsInCards: boolean;
}
export interface ISettings {
    isColorsInCards: boolean;
    setIsColorsInCards: (state: boolean) => void;
    isTwoColumns: boolean;
    setIsTwoColumns: (state: boolean) => void;
    showNewLabel: boolean;
    setShowNewLabel: (state: boolean) => void;
    order: boolean;
    setOrder: (state: boolean) => void;
}
export interface ISetOptions {
    replaceOption: (element: React.MouseEvent<HTMLDivElement>) => void;
    openEditThemeModal: () => void;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    isColorsInCards: boolean;
}
export type TUseLocaleStorage = (name: string, state: boolean) => [boolean, (state: boolean) => void];
export type TUseSortedCards = (Cards: ICard[], toggleWordsOrder: boolean) => ICard[];
export type TUseSelectedThemes = (
    Cards: ICard[],
    selectedTheme: string,
    toggleWordsOrder: boolean,
    selectedColor: TSelectColorOrNew | null
) => ICard[];
export type TUseCards = (
    Cards: ICard[],
    searchWord: string,
    selectedTheme: string,
    toggleWordsOrder: boolean,
    isSearchByWord: boolean,
    isLetterCaseInclude: boolean,
    selectedColor: TSelectColorOrNew | null
) => ICard[];
export type TUseSearchByWord = (array: string[], word: string) => string[];
export interface IGames {
    isColorsInCards: boolean;
}
export type TPrevState = { testByWord: boolean, currentColor: string };

export interface IRemoveTheme {
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
export type TAttachedControls = { attach: boolean, top: string, left: string }
export type TColorsOnCard = 'green' | 'red' | 'orange';
export interface ICheckboxesStatistics {
    years: boolean;
    months: boolean;
    days: boolean;
}
export interface IArrayWithStats {
    keys: string[];
    numbers: number[]
    count:number;
}