// redux
import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { AppDispatch } from '../store/store';
import { IOptionState } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    selectOptions: string[],
    optionState:IOptionState,
    chooseTheme:string,
    email:string,
    dispatch: AppDispatch,
) => void;
export const removeSelectTheme:FunctType = (selectOptions, optionState, chooseTheme, email, dispatch) => {
    const themes = selectOptions.filter(theme => theme !== chooseTheme);
    dispatch(setSelectOptions(themes));
    dispatch(UpdateThemes({ email, themes }));
    dispatch(setChooseTheme(''));
    dispatch(setOptionName('Тема'));
    dispatch(setOptionState({ ...optionState, removeMark: false }));
};