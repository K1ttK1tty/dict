import { FC } from 'react';

import BtnAddCard from './UI/BtnAddCard/BtnAddCard';

import { deleteAllEmptyThemes } from '../functions/deleteAllEmptyThemes';
import { removeSelectTheme } from '../functions/removeSelectTheme';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import '../styles/Vocabulary.css';

import { IRemoveTheme } from '../models/models';

import { getSelectedTheme } from '../Tests/StoreTests/Selectors';

const RemoveTheme: FC<IRemoveTheme> = function ({ setIsSelectOpen, isSelectOpen, selectedColorOrNewLabel }) {
    const dispatch = useAppDispatch();
    const { selectOptions, user, cards, data, currentDictionary } = useAppSelector(state => state.AuthSlice);
    const { searchWord } = useAppSelector(state => state.upMenu);
    const selectedTheme = useAppSelector(getSelectedTheme);
    const isCanDeleteTheme = isSelectOpen.removeMark && !selectedColorOrNewLabel && !searchWord;
    
    return (
        <>
            <h4 className="noCards">Пустота...</h4>
            {isCanDeleteTheme && (
                <div className="deleteThemeWrapper">
                    <BtnAddCard
                        noClick={'noClick removeSelectedTheme'}
                        onClick={() =>
                            deleteAllEmptyThemes(
                                cards,
                                selectOptions,
                                setIsSelectOpen,
                                isSelectOpen,
                                user.email,
                                data,
                                currentDictionary,
                                dispatch,
                            )
                        }
                        children="Удалить все пустые темы"
                    />
                    <BtnAddCard
                        noClick={'noClick'}
                        onClick={() =>
                            removeSelectTheme(
                                selectOptions,
                                setIsSelectOpen,
                                isSelectOpen,
                                selectedTheme,
                                user.email,
                                data,
                                currentDictionary,
                                dispatch,
                            )
                        }
                        children="Удалить эту тему"
                    />
                </div>
            )}
        </>
    );
};
export default RemoveTheme;

