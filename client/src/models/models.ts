export interface IColorObject{
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
    doubleRowCards: boolean;
    setDoubleRowCards: (state: boolean) => void;
    wordsOrder: boolean;
    setWordsOrder: (state: boolean) => void;
}
export interface ISetOptions {
    replaceOption: (element: React.MouseEvent<HTMLDivElement>) => void;
    setIsModal: (state: boolean) => void;
}