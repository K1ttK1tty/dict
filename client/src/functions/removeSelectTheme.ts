// redux
import {
    setSelectOptions,
    setSelectedTheme,
} from '../store/reducers/authorization/Authorization/AuthSlice';
import { updateThemes } from './updateThemes';
// types
import { TRemoveSelectTheme } from './functoinModels';
export const removeSelectTheme: TRemoveSelectTheme = (
    selectOptions,
    setIsSelectOpen,
    isSelectOpen,
    selectedTheme,
    email,
    data,
    currentDictionary,
    dispatch
) => {
    const themes = selectOptions.filter(theme => theme !== selectedTheme);
    dispatch(setSelectOptions(themes));
    updateThemes(currentDictionary, email, data, themes, dispatch);
    dispatch(setSelectedTheme(''));
    setIsSelectOpen({ ...isSelectOpen, removeMark: false });
};