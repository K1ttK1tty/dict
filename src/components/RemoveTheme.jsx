import React from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
import { styleRemoveTheme } from '../consts/consts';
import { useSelector } from 'react-redux';
const RemoveTheme = function ({ removeTheme }) {
    const optionState = useSelector(state => state.select.optionState)
    return (
        <div>
            <h4 className='noCards'>Пустота...</h4>
            {optionState.removeMark ? <BtnAddCard noClick={'noClick'}
                onClick={() => removeTheme()} style={styleRemoveTheme}>Удалить эту тему</BtnAddCard> : ''}
        </div>
    )
};
export default RemoveTheme;