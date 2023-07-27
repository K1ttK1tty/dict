import { FC } from 'react';
// components
import BtnAddCard from './UI/BtnAddCard/BtnAddCard';
// functions
import { removeSelectTheme } from '../functions/removeSelectTheme';
import { deleteAllEmptyThemes } from '../functions/deleteAllEmptyThemes';
// styles
import '../styles/Vocabulary.css';
//redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IRemoveTheme } from '../models/models';
const RemoveTheme: FC<IRemoveTheme> = function ({ setIsSelectOpen, isSelectOpen, selectedColorOrNewLabel }) {
    const dispatch = useAppDispatch();
    const {
        selectOptions,
        selectedTheme,
        user,
        cards,
        data,
        currentDictionary
    } = useAppSelector(state => state.AuthSlice);
    const isCanDeleteTheme = isSelectOpen.removeMark && !selectedColorOrNewLabel;
    return (
        <>
            <h4 className="noCards">Пустота...</h4>
            {
                isCanDeleteTheme &&
                <div className="deleteThemeWrapper">
                    <BtnAddCard
                        noClick={'noClick removeSelectedTheme'}
                        onClick={
                            () => deleteAllEmptyThemes(
                                cards,
                                selectOptions,
                                setIsSelectOpen,
                                isSelectOpen,
                                user.email,
                                data,
                                currentDictionary,
                                dispatch
                            )
                        }
                        children="Удалить все пустые темы"
                    />
                    <BtnAddCard
                        noClick={'noClick'}
                        onClick={
                            () => removeSelectTheme(
                                selectOptions,
                                setIsSelectOpen,
                                isSelectOpen,
                                selectedTheme,
                                user.email,
                                data,
                                currentDictionary,
                                dispatch
                            )
                        }
                        children="Удалить эту тему"
                    />
                </div>
            }
        </>
    );
};
export default RemoveTheme;