import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from "../store/reducers/authorization/AuthSlice"
import { UpdateThemes } from "../store/reducers/asyncActions/ActionCreator";

export const _removeTheme = (selectOptions, optionState, chooseTheme, email, dispatch) => {
    const themes = selectOptions.filter(theme => theme !== chooseTheme)
    dispatch(setSelectOptions(themes))
    dispatch(UpdateThemes({ email, themes }))
    dispatch(setChooseTheme(''))
    dispatch(setOptionName('Choose a theme'))
    dispatch(setOptionState({ ...optionState, removeMark: false }))
}