import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from "../store/reducers/authorization/Authorization/AuthSlice"
import { UpdateThemes } from "../store/reducers/authorization/Authorization/ActionCreator";

export const removeSelectTheme = (selectOptions, optionState, chooseTheme, email, dispatch) => {
    const themes = selectOptions.filter(theme => theme !== chooseTheme)
    dispatch(setSelectOptions(themes))
    dispatch(UpdateThemes({ email, themes }))
    dispatch(setChooseTheme(''))
    dispatch(setOptionName('Выбрать тему'))
    dispatch(setOptionState({ ...optionState, removeMark: false }))
}