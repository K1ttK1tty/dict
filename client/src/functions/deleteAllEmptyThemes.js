import { UpdateThemes } from "../store/reducers/authorization/Authorization/ActionCreator";

import {
    setSelectOptions,
    setChooseTheme,
    setOptionName,
    setOptionState
} from "../store/reducers/authorization/Authorization/AuthSlice"

export const deleteAllEmptyThemes = (cards, allThemes, optionState, email, dispatch) => {
    const themes = []

    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];

        if (allThemes.includes(card.theme) && !themes.includes(card.theme)) {
            themes.push(card.theme)
        }
    }


    dispatch(setSelectOptions(themes))
    dispatch(UpdateThemes({ email, themes }))
    dispatch(setChooseTheme(''))
    dispatch(setOptionName('Тема'))
    dispatch(setOptionState({ ...optionState, removeMark: false }))

}