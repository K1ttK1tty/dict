// functions
import { addNewTheme } from './addNewTheme';
import { isNotEmpty } from './isNotEmpty';
// redux
import { setCards, setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setIsModalAddCardActive } from '../store/reducers/modalAddCard';
import { setInputValue } from '../store/reducers/modalRenameCard';
import { UpdateCards } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
import { AppDispatch } from '../store/store';
type FunctType = (
    e: React.MouseEvent<HTMLButtonElement>,
    inputValue: ICard,
    Cards: ICard[],
    selectOptions: string[],
    email: string,
    dispatch: AppDispatch,
) => void;
export const addNewCard: FunctType = (e, inputValue, Cards, selectOptions, email, dispatch) => {
    e.preventDefault();
    if (isNotEmpty(inputValue.word) && isNotEmpty(inputValue.translate)) {
        const cards: ICard[] = [...Cards, { ...inputValue, id: Cards.length + 1 }];
        dispatch(setCards(cards));
        dispatch(UpdateCards({ email, cards }));
        addNewTheme(selectOptions, inputValue.theme, email, dispatch);
        dispatch(setIsModalAddCardActive(false));
        dispatch(setInputValue({ id: 0, word: '', translate: '', theme: '', }));

    } else dispatch(setServerMessage('Поля "Слово" и "Перевод" должны быть заполнены'));
};