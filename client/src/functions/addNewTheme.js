import { UpdateThemes } from "../store/reducers/asyncActions/ActionCreator";
import { setSelectOptions } from "../store/reducers/authorization/AuthSlice"
import { isNotEmpty } from "./isNotEmpty"
export const addNewTheme = (selectOptions, newTheme, email, dispatch) => {

    if (!isNotEmpty(newTheme)) {
        return;
    }
    let opt = [...selectOptions];
    let a = 0;
    for (let index = 0; index < opt.length; index++) {
        const element = opt[index];
        if (element === newTheme) a = 1;
    }
    if (!a) {
        const themes = [...selectOptions, newTheme]
        dispatch(setSelectOptions(themes))
        dispatch(UpdateThemes({ email, themes }))
    }
}