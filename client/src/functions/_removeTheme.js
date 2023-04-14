import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from "../store/reducers/select"

export const _removeTheme = (selectOptions, optionState, chooseTheme, dispatch) => {
    dispatch(setSelectOptions(selectOptions.filter(theme => theme !== chooseTheme)))
    dispatch(setChooseTheme(''))
    dispatch(setOptionName('Choose a theme'))
    dispatch(setOptionState({ ...optionState, removeMark: false }))
}