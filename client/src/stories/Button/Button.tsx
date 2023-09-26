import BtnAddCard from '../../components/UI/BtnAddCard/BtnAddCard';
import { IBtnProps } from '../../components/UI/BtnAddCard/BtnAddCardModel';

export const buttonAddCard = ({ dinamicclassname, children }: IBtnProps) => (
    <BtnAddCard data-testid="addCardButton" dinamicclassname={dinamicclassname} children={children} />
);
