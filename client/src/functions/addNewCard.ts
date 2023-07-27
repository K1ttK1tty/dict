// functions
import { addNewTheme } from './addNewTheme';
import { isNotEmpty } from './isNotEmpty';
import { updatedCards } from './UpdateCards';
// redux
import { setCards, setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setInputValue } from '../store/reducers/modalRenameCard';
// types
import { ICard } from '../store/storeModels';
import { TAddNewCard } from './functoinModels';
export const addNewCard: TAddNewCard = (
    e,
    inputValue,
    setIsAddCardModal,
    Cards,
    selectOptions,
    email,
    data,
    currentDictionary,
    dispatch
) => {
    e.preventDefault();
    if (isNotEmpty(inputValue.word) && isNotEmpty(inputValue.translate)) {
        const cards: ICard[] = [...Cards, { ...inputValue, id: Cards.length + 1 }];
        dispatch(setCards(cards));
        const newThemes = addNewTheme(selectOptions, inputValue.theme, dispatch);
        updatedCards(currentDictionary, email, data, cards, newThemes, dispatch);
        setIsAddCardModal(false);
        dispatch(setInputValue({ id: 0, word: '', translate: '', theme: '', note: '', favorite: false }));

    } else dispatch(setServerMessage('Поля "Слово" и "Перевод" должны быть заполнены'));
};