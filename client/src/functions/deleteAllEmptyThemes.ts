// redux
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from '../store/reducers/authorization/Authorization/AuthSlice';
// types
import { AppDispatch } from '../store/store';
import { ICard, IOptionState } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    cards: ICard[],
    allThemes: string[],
    optionState: IOptionState,
    email: string,
    dispatch: AppDispatch,
) => void;
export const deleteAllEmptyThemes: FunctType = (cards, allThemes, optionState, email, dispatch) => {
    const themes: string[] = [];
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        if (allThemes.includes(card.theme) && !themes.includes(card.theme)) {
            themes.push(card.theme);
        }
    }
    dispatch(setSelectOptions(themes));
    dispatch(UpdateThemes({ email, themes }));
    dispatch(setChooseTheme(''));
    dispatch(setOptionName('Тема'));
    dispatch(setOptionState({ ...optionState, removeMark: false }));
};