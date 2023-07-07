export interface ICardsControl {
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
    isAttached: boolean;
    setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
    isTwoColumns: boolean;
    setIsTwoColumns: (state: boolean) => void;
    isOpenModal: boolean;
    setIsModal: (state: boolean) => void;
    wordsOrder: boolean;
    setWordsOrder: (state: boolean) => void;
}
export type TMouseMove = (element: MouseEvent, shiftY: number, shiftX: number) => void;
export interface IPicIcon {
    styles: string;
    setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ISettingsIcon {
    dinamicClassName?: string;
}