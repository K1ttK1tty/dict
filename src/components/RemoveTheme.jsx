import React from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
const RemoveTheme = function ({ removeTheme,chooseTheme }) {

    const style = { margin: '30px auto ', display: 'block', background: 'white', fontWeight: '600' }
    return (
        <div>
            <h4 className='noCards'>Пустота...</h4>
            {chooseTheme ? <BtnAddCard noClick={'noClick'} onClick={() => removeTheme()} style={style}>Удалить эту тему</BtnAddCard> : ''}
        </div>
    )
};
export default RemoveTheme;