import { FC, memo } from 'react';
// components
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
// functions
import { removeSelectTheme } from '../functions/removeSelectTheme';
import { deleteAllEmptyThemes } from '../functions/deleteAllEmptyThemes';
// styles
import '../styles/Vocabulary.css';
//redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
const RemoveTheme: FC = memo(function () {
    const dispatch = useAppDispatch();
    const {
        selectOptions,
        chooseTheme,
        optionState,
        user,
        cards
    } = useAppSelector(state => state.AuthSlice);
    return (
        <div>
            <h4 className="noCards">Пустота...</h4>
            {
                optionState.removeMark &&
                <div className="deleteThemeWrapper">
                    <BtnAddCard
                        noClick={'noClick removeSelectedTheme'}
                        onClick={() => deleteAllEmptyThemes(cards, selectOptions, optionState, user.email, dispatch)}
                        children="Удалить все пустые темы"
                    />
                    <BtnAddCard
                        noClick={'noClick'}
                        onClick={() => removeSelectTheme(selectOptions, optionState, chooseTheme, user.email, dispatch)}
                        children="Удалить эту тему"
                    />
                </div>
            }
        </div>
    );
});
export default RemoveTheme;