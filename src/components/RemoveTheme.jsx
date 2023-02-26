import React from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
import { styleRemoveTheme } from '../consts/consts';
//redux
import { setOptionName } from '../store/select';
import { useSelector, useDispatch } from 'react-redux';
import { setOptionState } from '../store/select';
import { setSelectOptions } from '../store/select';
import { setChooseTheme } from '../store/select';
const RemoveTheme = function () {
    const dispatch = useDispatch()
    const selectOptions = useSelector(state => state.select.selectOptions)
    const chooseTheme = useSelector(state => state.select.chooseTheme)
    function removeTheme() {
        // _removeTheme(setSelectOptions, selectOptions, chooseTheme, setChooseTheme)
        dispatch(setSelectOptions(selectOptions.filter(theme => theme != chooseTheme)))
        dispatch(setChooseTheme(''))
        dispatch(setOptionName('Choose a theme'))
        dispatch(setOptionState({ ...optionState, removeMark: false }))
    }
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