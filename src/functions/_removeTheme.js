import { setSelectOptions } from "../store/select"
import { setChooseTheme } from "../store/select"
import { setOptionName } from "../store/select"
import { setOptionState } from "../store/select"
export const _removeTheme = (selectOptions, optionState, chooseTheme, dispatch) => {
    dispatch(setSelectOptions(selectOptions.filter(theme => theme !== chooseTheme)))
    dispatch(setChooseTheme(''))
    dispatch(setOptionName('Choose a theme'))
    dispatch(setOptionState({ ...optionState, removeMark: false }))
}