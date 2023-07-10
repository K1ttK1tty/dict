// redux
import {
    setSelectOptions,
    setSelectedTheme,
    setOptionState
} from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { TRemoveSelectTheme } from './functoinModels';
export const removeSelectTheme: TRemoveSelectTheme = (selectOptions, optionState, selectedTheme, email, dispatch) => {
    const themes = selectOptions.filter(theme => theme !== selectedTheme);
    dispatch(setSelectOptions(themes));
    dispatch(UpdateThemes({ email, themes }));
    dispatch(setSelectedTheme(''));
    dispatch(setOptionState({ ...optionState, removeMark: false }));
};