import { setCards } from "../store/reducers/authorization/AuthSlice"
import { setIsModalAddCardActive } from "../store/reducers/modalAddCard"
import { setInputValue } from "../store/reducers/modalRenameCard"
import { addNewTheme } from "./addNewTheme"
import { UpdateCards } from "../store/reducers/asyncActions/ActionCreator"
import { isNotEmpty } from "./isNotEmpty"
export const addNewCard = (e, inputValue, Cards, selectOptions, email, dispatch) => {
    e.preventDefault()
    if (isNotEmpty(inputValue.word) && isNotEmpty(inputValue.translate)) {
        const cards = [...Cards, { id: Cards.length + 1, ...inputValue }];

        dispatch(setCards(cards))
        dispatch(UpdateCards({ email, cards }))
        addNewTheme(selectOptions, inputValue.theme, email, dispatch)

        dispatch(setIsModalAddCardActive(false));
        dispatch(setInputValue({ word: '', translate: '', theme: '', }))

    } else window.alert('Поля "Word" и "Translate" должны быть заполнены')
}