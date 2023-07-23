import { FC, useState, useRef, memo } from 'react';
// components
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import ListWithSearching from '../../listWithSearching/ListWithSearching';
// functions
import { clearInput } from '../ModalEditThemes/functionsModalEditThemes';
import { selectTheme } from '../ModalEditThemes/functionsModalEditThemes';
// functions 
import { useSearchByWord } from '../../../../hooks/useCards';
import { addNewDictionary } from '../../../../functions/addNewDictionary';
import { deleteDictionary } from '../../../../functions/deleteDictionary';
import { cutLongLine } from '../../../../functions/cutLongLine';
// styles
import styles from './ModalDictionary.module.css';
import style from '../ModalEditThemes/ModalEditThemes.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    setServerMessage,
    setCurrentDictionary,
    changeDictionary
} from '../../../../store/reducers/authorization/Authorization/AuthSlice';
// models
import { IModalDictionaryMain } from '../ModalsModels';
const ModalDictionaryMain: FC<IModalDictionaryMain> = memo(function (
    {
        isModal,
        setIsModal,
        setDictionaryContent,
        dictionaryContent
    }
) {
    const dispatch = useAppDispatch();
    const { currentDictionary, data, user } = useAppSelector(state => state.AuthSlice);

    const [wordCreate, setWordCreate] = useState<string>('');

    const inputRemoveDictionary = useRef<HTMLInputElement | null>(null);
    const [wordRemove, setWordRemove] = useState<string>('');
    const arrayWithoutDefault = JSON.parse(JSON.stringify(data));
    delete arrayWithoutDefault['default'];
    const arrayRemoveDictionary = useSearchByWord(Object.keys(arrayWithoutDefault), wordRemove);

    const inputChangeDictionary = useRef<HTMLInputElement | null>(null);
    const [wordChange, setWordChange] = useState<string>('');
    const arrayWithoutCurrentDictionary: string[] = JSON.parse(JSON.stringify(Object.keys(data)));

    const [selectedElement, setSelectedElement] = useState<HTMLDivElement | null>(null);
    const onOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
        selectTheme(e, selectedElement, setSelectedElement, style);
    };
    const [prev, setPrev] = useState<boolean>(isModal);
    if (prev !== isModal) {
        setPrev(isModal);
        setWordChange('');
        setWordRemove('');
        setWordCreate('');
        setSelectedElement(null);
        if (inputChangeDictionary.current) inputChangeDictionary.current.value = '';
        if (inputRemoveDictionary.current) inputRemoveDictionary.current.value = '';
        if (isModal) {
            setTimeout(() => {
                if (inputChangeDictionary.current) {
                    inputChangeDictionary.current.focus();
                }
            }, 200);
        }
        const element = document.getElementsByClassName(style.selectedTheme)[0];
        if (element) element.classList.remove(style.selectedTheme);
    }

    if (dictionaryContent.createContent) {
        return (
            <form onSubmit={e => {
                e.preventDefault();
                addNewDictionary(wordCreate, user.email, data, dispatch);
                dispatch(setCurrentDictionary(wordCreate));
                dispatch(changeDictionary(wordCreate));
                setIsModal(false);
            }}>
                <InputAddCard
                    defaultTheme={wordCreate}
                    setDefaultTheme={setWordCreate}
                    dinamicclassname={[style.input, style.inputCreateDictionary].join(' ')}
                    placeholder="Имя словаря..."
                />
                <BtnAddCard
                    children="Создать"
                    type="submit"
                    dinamicclassname={styles.button}
                />
            </form>
        );
    }
    if (dictionaryContent.changeContent) {
        return (
            <form onSubmit={e => {
                e.preventDefault();
                if (!selectedElement) {
                    dispatch(setServerMessage('Нужно выбрать словарь!'));
                    return;
                }
                dispatch(setCurrentDictionary(selectedElement.innerText));
                dispatch(changeDictionary(selectedElement.innerText));
                setIsModal(false);
            }}>
                <ListWithSearching
                    word={wordChange}
                    setWord={setWordChange}
                    inputSearchThemes={inputChangeDictionary}
                    setClearInput={() => clearInput(wordChange, setWordChange, inputChangeDictionary)}
                    onItemClick={e => onOptionClick(e)}
                    array={
                        arrayWithoutCurrentDictionary.filter(element => element !== currentDictionary)
                    }
                    dinamicClassName={styles.listStyle}
                />
                <BtnAddCard
                    children="Сменить"
                    type="submit"
                    dinamicclassname={styles.button}
                />
            </form>
        );
    }
    if (dictionaryContent.removeContent) {
        return (
            <form onSubmit={e => {
                if (!selectedElement) {
                    dispatch(setServerMessage('Нужно выбрать словарь!'));
                    return;
                }
                if (selectedElement.innerText === currentDictionary) {
                    dispatch(setCurrentDictionary('default'));
                    dispatch(changeDictionary('default'));
                }
                deleteDictionary(selectedElement.innerText, user.email, data, dispatch);
                e.preventDefault();
            }}>
                <ListWithSearching
                    word={wordRemove}
                    setWord={setWordRemove}
                    inputSearchThemes={inputRemoveDictionary}
                    setClearInput={() => clearInput(wordRemove, setWordRemove, inputRemoveDictionary)}
                    onItemClick={e => onOptionClick(e)}
                    array={arrayRemoveDictionary}
                    dinamicClassName={styles.listStyle}
                />
                <BtnAddCard
                    children="Удалить"
                    type="submit"
                    dinamicclassname={[styles.button, styles.removeButton].join(' ')}
                />
            </form>
        );
    }
    const titleClassname = currentDictionary === 'default'
        ? styles.title
        : [styles.title, styles.mb30].join(' ');
    return (
        <>
            <h2 className={titleClassname}>Текущий словарь: {cutLongLine(currentDictionary, 16)}</h2>
            {
                currentDictionary === 'default' &&
                <p className={styles.defaultDictionary}>Это стандартный словарь, его нельзя удалить</p>
            }
            <BtnAddCard
                children="Сменить"
                dinamicclassname={styles.button}
                onMouseDown={e => {
                    e.stopPropagation();
                    setDictionaryContent({
                        removeContent: false,
                        createContent: false,
                        changeContent: true
                    });
                }}
            />
            <BtnAddCard
                children="Создать"
                dinamicclassname={styles.button}
                onMouseDown={e => {
                    e.stopPropagation();
                    setDictionaryContent({
                        removeContent: false,
                        createContent: true,
                        changeContent: false
                    });
                }}
            />
            <BtnAddCard
                children="Удалить"
                dinamicclassname={[styles.button, styles.removeButton].join(' ')}
                onMouseDown={e => {
                    e.stopPropagation();
                    setDictionaryContent({
                        removeContent: true,
                        createContent: false,
                        changeContent: false
                    });
                }}
            />
        </>
    );

});
export default ModalDictionaryMain;