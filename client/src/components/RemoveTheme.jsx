import React from 'react';
// components
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
// functions
import { removeSelectTheme } from '../functions/removeSelectTheme';
import { deleteAllEmptyThemes } from '../functions/deleteAllEmptyThemes';
// styles
import '../styles/Vocabulary.css'
//redux
import { useSelector, useDispatch } from 'react-redux';

const RemoveTheme = function () {
    const dispatch = useDispatch()
    const {
        selectOptions,
        chooseTheme,
        optionState,
        user,
        cards
    } = useSelector(state => state.AuthSlice)

    return (
        <div>
            <h4 className='noCards'>Пустота...</h4>
            {optionState.removeMark &&
                <div className='deleteThemeWrapper'>
                    <BtnAddCard
                        noClick={'noClick'}
                        onClick={() => deleteAllEmptyThemes(cards, selectOptions, optionState, user.email, dispatch)}
                        // style={styleRemoveTheme}
                        children='Удалить все пустые темы'
                    />
                    <BtnAddCard
                        noClick={'noClick'}
                        onClick={() => removeSelectTheme(selectOptions, optionState, chooseTheme, user.email, dispatch)}
                        // style={styleRemoveTheme}
                        children='Удалить эту тему'
                    />
                </div>
            }
        </div>
    )
};
export default RemoveTheme;