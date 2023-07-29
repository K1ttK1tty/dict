import { ICard } from '../../../store/storeModels';

import { TColorsOnCard } from '../../../models/models';
import { TSelectColorOrNew } from '../MySelect/MySelectModel';

export interface ICardProps {
    card: ICard;
    index: number;
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    setIsEditCardModal: (state: boolean) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
export type TSetNewColor = (cards: ICard[], id: number, color: TColorsOnCard) => ICard[];
export interface ISetCards {
    Cards: ICard[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    setIsEditCardModal: (state: boolean) => void;
    stale: boolean;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
