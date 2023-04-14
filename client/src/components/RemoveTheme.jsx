import React from 'react';
import '../styles/Vocabulary.css'
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
import { styleRemoveTheme } from '../consts/consts';
import { _removeTheme } from '../functions/_removeTheme';
//redux
import { useSelector, useDispatch } from 'react-redux';
const RemoveTheme = function () {
    const dispatch = useDispatch()
    const selectOptions = useSelector(state => state.select.selectOptions)
    const chooseTheme = useSelector(state => state.select.chooseTheme)
    const optionState = useSelector(state => state.select.optionState)

    return (
        <div>
            <h4 className='noCards'>Пустота...</h4>
            {optionState.removeMark ?
                <BtnAddCard
                    noClick={'noClick'}
                    onClick={() => _removeTheme(selectOptions, optionState, chooseTheme, dispatch)}
                    style={styleRemoveTheme}
                    children='Удалить эту тему' />
                : ''}
        </div>
    )
};
export default RemoveTheme;