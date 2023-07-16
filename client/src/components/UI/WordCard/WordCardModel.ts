import { ICard } from '../../../store/storeModels';
import { TColorsOnCard } from '../../../models/models';
export interface ICardProps {
    card: ICard;
    index: number;
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    isTwoColumns: boolean;
    isColorsInCards: boolean;
    setIsEditCardModal: (state: boolean) => void;
    showNewLabel: boolean;
}
export type TSetNewColor = (cards: ICard[], id: number, color: TColorsOnCard) => ICard[];
export interface ISetCards {
    Cards: ICard[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    isTwoColumns: boolean;
    isColorsInCards: boolean;
    setIsEditCardModal: (state: boolean) => void;
    stale: boolean;
    showNewLabel: boolean;
}