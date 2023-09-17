import { TSelectColorOrNew } from '../components/UI/MySelect/MySelectModel';

import { ICard, IOptionState } from '../store/storeModels';

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
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    isAttached: TAttachedControls;
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}

export interface ISetOptions {
    replaceOption: (element: React.MouseEvent<HTMLDivElement>) => void;
    openEditThemeModal: () => void;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
}
export type TUseSortedCards = (Cards: ICard[]) => ICard[];
export type TUseSelectedThemes = (
    Cards: ICard[],
    selectedTheme: string,
    selectedColor: TSelectColorOrNew | null,
) => ICard[];
export type TUseCards = (
    Cards: ICard[],
    searchWord: string,
    selectedTheme: string,
    isSearchByWord: boolean,
    isLetterCaseInclude: boolean,
    selectedColor: TSelectColorOrNew | null,
) => ICard[];
export type TUseSearchByWord = (array: string[], word: string) => string[];
export type TPrevState = { testByWord: boolean; currentColor: string; testByFavorite: boolean };

export interface IRemoveTheme {
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
export type TAttachedControls = { attach: boolean; top: string; left: string };
export type TColorsOnCard = 'green' | 'red' | 'orange';
export interface ICheckboxesStatistics {
    years: boolean;
    months: boolean;
    days: boolean;
}
export interface IArrayWithStats {
    keys: string[];
    numbers: number[];
    count: number;
}
export interface IFavoriteCard {
    isFavorite: boolean;
    dinamicClassName?: string;
}
