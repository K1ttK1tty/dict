import { setCards } from "../store/reducers/Cards"
import { setIsModalAddCardActive } from "../store/reducers/modalAddCard"
import { setInputValue } from "../store/reducers/modalRenameCard"
import { setSelectOptions } from "../store/reducers/select"
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