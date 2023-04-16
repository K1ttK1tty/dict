import { UpdateThemes } from "../store/reducers/asyncActions/ActionCreator";
import { setSelectOptions } from "../store/reducers/authorization/AuthSlice"
export const ADDNewTheme = (selectOptions, newTheme, email, dispatch) => {
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