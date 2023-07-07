import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
export interface ICardRand {
    card: ICard;
    index: number;
    testByWord: boolean;
}