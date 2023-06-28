import { FC, useState, memo } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
// hooks
import { useSearchByWord } from '../../../../hooks/useCards';
// functions
import { overrideTheme } from '../../../../functions/overrideTheme';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
import { overrideThemesInCards } from '../../../../functions/overrideThemesInCards';
// styles
import style from './ModalEditThemes.module.css';
import listStyles from '../../MySelect/MySelect.module.css';
import btnStyles from '../../Modal/ModalEditCard/Modal.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { UpdateThemes, UpdateCards } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import {
    setSelectOptions,
    setCards,
    setServerMessage
} from '../../../../store/reducers/authorization/Authorization/AuthSlice';
interface IModalEditThemesContent {
    setIsModal: (state: boolean) => void;
}
const ModalEditThemesContent: FC<IModalEditThemesContent> = memo(function ({ setIsModal }) {
    const [word, setWord] = useState<string>('');
    const [newTheme, setNewTheme] = useState<string>('');
    const [selectedElement, setSelectedElement] = useState<HTMLDivElement | null>(null);
    const { user, selectOptions, cards } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();
    const themes = useSearchByWord(selectOptions, word);
    const closeButtonStyle = word
        ? style.closeButton
        : style.closeButtonHide;

    const clearInput = () => {
        if (word) setWord('');
    };
    const selectTheme = (e: React.MouseEvent<HTMLDivElement>) => {
        const divElement = e.target as HTMLDivElement;
        if (divElement === selectedElement) {
            divElement.classList.remove(style.selectedTheme);
            setSelectedElement(null);
            return;
        }
        if (selectedElement) {
            selectedElement.classList.remove(style.selectedTheme);
            divElement.classList.add(style.selectedTheme);
            setSelectedElement(divElement);
            return;
        }
        divElement.classList.add(style.selectedTheme);
        setSelectedElement(divElement);
    };
    const changeThemeAndWords = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedElement || !isNotEmpty(newTheme)) {
            dispatch(setServerMessage('Нужно выбрать старую и новую тему!'));
            return;
        }
        const newThemesArray = overrideTheme(selectOptions, selectedElement!.innerText, newTheme);
        const newCardsArray = overrideThemesInCards(cards, selectedElement!.innerText, newTheme);

        dispatch(setSelectOptions(newThemesArray));
        dispatch(setCards(newCardsArray));

        dispatch(UpdateCards({ email: user.email, cards: newCardsArray }));
        dispatch(UpdateThemes({ email: user.email, themes: newThemesArray }));

        setIsModal(false);
        selectedElement.classList.remove(style.selectedTheme);
        setSelectedElement(null);
        setWord('');
        setNewTheme('');
    };
    return (
        <div className={style.main}>
            <form onSubmit={changeThemeAndWords} >
                <div className={style.wrapper}>
                    <div id="editThemeList" className={style.content}>
                        <InputAddCard
                            dinamicclassname={style.input}
                            placeholder="Искать..."
                            defaultTheme={word}
                            setDefaultTheme={setWord}
                            type="text"
                        />
                        <button
                            id="close"
                            onMouseDown={clearInput}
                            className={closeButtonStyle}
                        >
                            &times;
                        </button>
                        <div className={style.list}>
                            {
                                themes.map((option, id) =>
                                    <div
                                        className={[listStyles.optionsOption, style.theme].join(' ')}
                                        key={option + id + 'key'}
                                        onMouseDown={selectTheme}
                                    >
                                        {option}
                                    </div>
                                )
                            }
                        </div>
                    </div>
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