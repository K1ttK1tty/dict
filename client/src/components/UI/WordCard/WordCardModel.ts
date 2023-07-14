import { ICard } from '../../../store/storeModels';
export interface ICardProps {
    card: ICard;
    index: number;
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    isTwoColumns: boolean;
    isColorsOnCards: boolean;
    setIsEditCardModal: (state: boolean) => void;
}
export type TSetNewColor = (cards: ICard[], id: number, color: 'green' | 'red' | 'orange') => ICard[];
export interface ISetCards {
    Cards: ICard[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    isTwoColumns: boolean;
    isColorsOnCards: boolean;
    setIsEditCardModal: (state: boolean) => void;
    stale: boolean;
}