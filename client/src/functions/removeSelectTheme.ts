// redux
import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { TRemoveSelectTheme } from './functoinModels';
export const removeSelectTheme: TRemoveSelectTheme = (selectOptions, optionState, chooseTheme, email, dispatch) => {
    const themes = selectOptions.filter(theme => theme !== chooseTheme);
    dispatch(setSelectOptions(themes));
    dispatch(UpdateThemes({ email, themes }));
    dispatch(setChooseTheme(''));
    dispatch(setOptionName('Тема'));
    dispatch(setOptionState({ ...optionState, removeMark: false }));
};