import { IOptionState } from '../../../store/storeModels';

import { TAttachedControls } from '../../../models/models';
import { TSelectColorOrNew } from '../MySelect/MySelectModel';

export interface ICardsControl {
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
    isAttached: TAttachedControls;
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>;
    setIsModal: (state: boolean) => void;
    setIsAddCardModal: (state: boolean) => void;
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
    setIsDictionaryModal: (state: boolean) => void;
}
export type TMouseMove = (
    element: MouseEvent,
    shiftY: number,
    shiftX: number,
    windowBlock: React.RefObject<HTMLDivElement> | null,
    isAttached: TAttachedControls,
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>,
) => void;
export interface IPicIcon {
    styles: string;
    isAttached: TAttachedControls;
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>;
}
export interface ISettingsIcon {
    dinamicClassName?: string;
}
export type TMove = (
    element: React.MouseEvent,
    windowBlock: React.RefObject<HTMLDivElement> | null,
    isCanMove: boolean,
    isAttached: TAttachedControls,
    setIsAttached: React.Dispatch<React.SetStateAction<TAttachedControls>>,
) => void;
