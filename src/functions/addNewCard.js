import { setCards } from "../store/Cards"
import { setIsModalAddCardActive } from "../store/modalAddCard"
import { setInputValue } from "../store/modalRenameCard"
import { setSelectOptions } from "../store/select"
import { ADDNewTheme } from "./ADDNewTheme"
export const addNewCard = (e, inputValue, Cards, selectOptions, dispatch) => {
    e.preventDefault()
    if (inputValue.word && inputValue.translate) {
        dispatch(setCards([...Cards, { id: Cards.length + 1, ...inputValue }]))
        ADDNewTheme(selectOptions, inputValue.theme, setSelectOptions, dispatch)
        dispatch(setIsModalAddCardActive(false));
        dispatch(setInputValue({ word: '', translate: '', theme: '', }))
    } else window.alert('Поля "Word" и "Translate" должны быть заполнены')
}