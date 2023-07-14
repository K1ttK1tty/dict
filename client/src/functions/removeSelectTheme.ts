// redux
import {
    setSelectOptions,
    setSelectedTheme,
} from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { TRemoveSelectTheme } from './functoinModels';
export const removeSelectTheme: TRemoveSelectTheme = (
    selectOptions,
    setIsSelectOpen,
    isSelectOpen,
    selectedTheme,
    email,
    dispatch
) => {
    const themes = selectOptions.filter(theme => theme !== selectedTheme);
    dispatch(setSelectOptions(themes));
    dispatch(UpdateThemes({ email, themes }));
    dispatch(setSelectedTheme(''));
    setIsSelectOpen({ ...isSelectOpen, removeMark: false });
};