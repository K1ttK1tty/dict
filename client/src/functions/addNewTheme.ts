// redux
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setSelectOptions } from '../store/reducers/authorization/Authorization/AuthSlice';
// functions
import { isNotEmpty } from './isNotEmpty';
// types
import { TAddNewTheme } from './functoinModels';

export const addNewTheme: TAddNewTheme = (selectOptions, newTheme, email, dispatch) => {
    if (!isNotEmpty(newTheme)) {
        return;
    }
    const opt = [...selectOptions];
    let a = 0;
    for (let index = 0; index < opt.length; index++) {
        const element = opt[index];
        if (element === newTheme) a = 1;
    }
    if (!a) {
        const themes = [...selectOptions, newTheme];
        dispatch(setSelectOptions(themes));
        dispatch(UpdateThemes({ email, themes }));
    }
};