import { FC, useState, useRef, memo } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ListWithSearching from '../../listWithSearching/ListWithSearching';
// hooks
import { useSearchByWord } from '../../../../hooks/useCards';
// functions
import { overrideTheme } from '../../../../functions/overrideTheme';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
import { overrideThemesInCards } from '../../../../functions/overrideThemesInCards';
import { selectTheme } from './functionsModalEditThemes';
import { clearInput } from './functionsModalEditThemes';
import { updatedCards } from '../../../../functions/UpdateCards';
// styles
import style from './ModalEditThemes.module.css';
import btnStyles from '../../Modal/ModalEditCard/Modal.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    setSelectOptions,
    setCards,
    setServerMessage
} from '../../../../store/reducers/authorization/Authorization/AuthSlice';
import { IModalEditThemesContent } from '../ModalsModels';
const ModalEditThemesContent: FC<IModalEditThemesContent> = memo(function (
    {
        setIsEditThemesModal,
        isEditThemesModal
    }
) {
    const [word, setWord] = useState<string>('');
    const [newTheme, setNewTheme] = useState<string>('');
    const [selectedElement, setSelectedElement] = useState<HTMLDivElement | null>(null);
    const [prevModalState, setPrevModalState] = useState<boolean>(isEditThemesModal);
    const inputSearchThemes = useRef<HTMLInputElement | null>(null);
    const {
        user,
        selectOptions,
        cards,
        data,
        currentDictionary
    } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();
    const themes = useSearchByWord(selectOptions, word);
    const changeThemeAndWords = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedElement || !isNotEmpty(newTheme)) {
            dispatch(setServerMessage('Нужно выбрать старую/новую тему!'));
            return;
        }
        const newThemesArray = overrideTheme(selectOptions, selectedElement!.innerText, newTheme);
        const newCardsArray = overrideThemesInCards(cards, selectedElement!.innerText, newTheme);

        dispatch(setSelectOptions(newThemesArray));
        dispatch(setCards(newCardsArray));
        updatedCards(currentDictionary, user.email, data, newCardsArray, newThemesArray, dispatch);

        setIsEditThemesModal(false);
        selectedElement.classList.remove(style.selectedTheme);
        setSelectedElement(null);
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
            <form onSubmit={changeThemeAndWords} >
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
                            dinamicclassname={[style.input, style.mb12Center].join(' ')}
                            placeholder="Новая тема..."
                            defaultTheme={newTheme}
                            setDefaultTheme={setNewTheme}
                            type="text"
                        />
                    </div>
                </div>
                <BtnAddCard
                    aria={'Изменить тему'}
                    dinamicclassname={[btnStyles.btnFormEditCard, style.button].join(' ')}
                    children="Изменить"
                    type="submit"
                />
            </form>
        </div>
    );
});
export default ModalEditThemesContent;