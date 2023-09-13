import { TSelectColorOrNew } from '../MySelect/MySelectModel';

export interface ICardsInfo {
    isMovedBlock?: boolean;
    setIsDictionaryModal: (state: boolean) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
