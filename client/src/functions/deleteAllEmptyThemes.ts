// redux
import { UpdateThemes } from '../store/reducers/authorization/Authorization/ActionCreator';
import {
    setSelectOptions,
    setSelectedTheme
} from '../store/reducers/authorization/Authorization/AuthSlice';
// types
import { TDeleteAllEmptyThemes } from './functoinModels';
export const deleteAllEmptyThemes: TDeleteAllEmptyThemes =
    (
        cards,
        allThemes,
        setIsSelectOpen,
        isSelectOpen,
        email,
        dispatch
    ) => {
        const themes: string[] = [];
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            if (allThemes.includes(card.theme) && !themes.includes(card.theme)) {
                themes.push(card.theme);
            }
        }
        dispatch(setSelectOptions(themes));
        dispatch(UpdateThemes({ email, themes }));
        dispatch(setSelectedTheme(''));
        setIsSelectOpen({ ...isSelectOpen, removeMark: false });
    };