import { FC, memo, useRef, useState } from 'react';

import { updatedCards } from '../../../../functions/UpdateCards';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
import { overrideTheme } from '../../../../functions/overrideTheme';
import { overrideThemesInCards } from '../../../../functions/overrideThemesInCards';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useSearchByWord } from '../../../../hooks/useCards';
import { clearInput, selectTheme } from './functionsModalEditThemes';

import btnStyles from '../../Modal/ModalEditCard/Modal.module.css';
import style from './ModalEditThemes.module.css';

import {
    setCards,
    setSelectOptions,
    setSelectedTheme,
    setServerMessage,
} from '../../../../store/reducers/authorization/Authorization/AuthSlice';

import { IModalEditThemesContent } from '../ModalsModels';

import { getSelectedTheme } from '../../../../Tests/StoreTests/Selectors';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import ListWithSearching from '../../listWithSearching/ListWithSearching';

const ModalEditThemesContent: FC<IModalEditThemesContent> = memo(function ({
    setIsEditThemesModal,
    isEditThemesModal,
}) {
    const [word, setWord] = useState<string>('');
    const [newTheme, setNewTheme] = useState<string>('');
    const [selectedElement, setSelectedElement] = useState<HTMLDivElement | null>(null);
    const [prevModalState, setPrevModalState] = useState<boolean>(isEditThemesModal);
    const inputSearchThemes = useRef<HTMLInputElement | null>(null);
    const { user, selectOptions, cards, data, currentDictionary } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();
    const themes = useSearchByWord(selectOptions, word);
    const selectedTheme = useAppSelector(getSelectedTheme);
    const changeThemeAndWords = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedElement || !isNotEmpty(newTheme)) {
            dispatch(setServerMessage('Нужно выбрать старую/новую тему!'));
            return;
        }
        const newThemesArray = overrideTheme(selectOptions, selectedElement!.innerHTML, newTheme);
        const newCardsArray = overrideThemesInCards(cards, selectedElement!.innerHTML, newTheme);

        dispatch(setSelectOptions(newThemesArray));
        dispatch(setCards(newCardsArray));
        updatedCards(currentDictionary, user.email, data, newCardsArray, newThemesArray, dispatch);

        setIsEditThemesModal(false);
        selectedElement.classList.remove(style.selectedTheme);
        setSelectedElement(null);
        if (selectedTheme === selectedElement.innerHTML) {
            setWord('');
            setNewTheme('');
            dispatch(setSelectedTheme(newTheme));
            return;
        }
        setWord('');
        setNewTheme('');
    };
    if (prevModalState !== isEditThemesModal) {
        setPrevModalState(isEditThemesModal);
        setWord('');
        setNewTheme('');
        setSelectedElement(null);
        if (inputSearchThemes.current) {
            inputSearchThemes.current.value = '';
        }
        if (isEditThemesModal) {
            setTimeout(() => {
                if (inputSearchThemes.current) {
                    inputSearchThemes.current.focus();
                }
            }, 200);
        }
        const element = document.getElementsByClassName(style.selectedTheme)[0];
        if (element) element.classList.remove(style.selectedTheme);
    }
    const onOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
        selectTheme(e, selectedElement, setSelectedElement, style);
    };
    return (
        <div className={style.main}>
            <form onSubmit={changeThemeAndWords}>
                <div className={style.wrapper}>
                    <ListWithSearching
                        inputSearchThemes={inputSearchThemes}
                        word={word}
                        setWord={setWord}
                        array={themes}
                        setClearInput={() => clearInput(word, setWord, inputSearchThemes)}
                        onItemClick={e => onOptionClick(e)}
                    />

                    <div className={style.icon}>
                        <div className={style.arrow}></div>
                    </div>
                    <div className={style.newThemeBlock}>
                        <InputAddCard
                            testId="inputForNewTheme"
                            dinamicclassname={[style.input, style.mb12Center].join(' ')}
                            placeholder="Новая тема..."
                            defaultTheme={newTheme}
                            setDefaultTheme={setNewTheme}
                            type="text"
                        />
                    </div>
                </div>
                <BtnAddCard
                    aria={'Изменить эту тему'}
                    dinamicclassname={[btnStyles.btnFormEditCard, style.button].join(' ')}
                    children="Изменить"
                    type="submit"
                />
            </form>
        </div>
    );
});
export default ModalEditThemesContent;
