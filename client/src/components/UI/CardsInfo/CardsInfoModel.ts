export interface ICardsInfo {
    isMovedBlock?: boolean;
    isTwoColumns: boolean;
    setIsTwoColumns: (state: boolean) => void;
    order: boolean;
    setOrder: (state: boolean) => void;
}