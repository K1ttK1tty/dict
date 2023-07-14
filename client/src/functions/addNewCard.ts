// functions
import { addNewTheme } from './addNewTheme';
import { isNotEmpty } from './isNotEmpty';
// redux
import { setCards, setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setInputValue } from '../store/reducers/modalRenameCard';
import { UpdateCards } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { ICard } from '../store/storeModels';
import { TAddNewCard } from './functoinModels';
export const addNewCard: TAddNewCard = (e, inputValue, setIsAddCardModal, Cards, selectOptions, email, dispatch) => {
    e.preventDefault();
    if (isNotEmpty(inputValue.word) && isNotEmpty(inputValue.translate)) {
        const cards: ICard[] = [...Cards, { ...inputValue, id: Cards.length + 1 }];
        dispatch(setCards(cards));
        dispatch(UpdateCards({ email, cards }));
        addNewTheme(selectOptions, inputValue.theme, email, dispatch);
        setIsAddCardModal(false)
        dispatch(setInputValue({ id: 0, word: '', translate: '', theme: '', note: '' }));

    } else dispatch(setServerMessage('Поля "Слово" и "Перевод" должны быть заполнены'));
};