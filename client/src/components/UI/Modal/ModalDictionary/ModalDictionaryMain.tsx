import { FC, memo, useRef, useState } from 'react';

import { addNewDictionary } from '../../../../functions/addNewDictionary';
import { cutLongLine } from '../../../../functions/cutLongLine';
import { deleteDictionary } from '../../../../functions/deleteDictionary';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useSearchByWord } from '../../../../hooks/useCards';
import { useLocaleStorage } from '../../../../hooks/useLocaleStorage';
import { clearInput, selectTheme } from '../ModalEditThemes/functionsModalEditThemes';

import style from '../ModalEditThemes/ModalEditThemes.module.css';
import styles from './ModalDictionary.module.css';

import {
    changeDictionary,
    setCurrentDictionary,
    setServerMessage,
} from '../../../../store/reducers/authorization/Authorization/AuthSlice';

import { IModalDictionaryMain } from '../ModalsModels';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import ListWithSearching from '../../listWithSearching/ListWithSearching';

const ModalDictionaryMain: FC<IModalDictionaryMain> = memo(function ({
    isModal,
    setIsModal,
    setDictionaryContent,
    dictionaryContent,
    title,
}) {
    const dispatch = useAppDispatch();
    const { currentDictionary, data, user } = useAppSelector(state => state.AuthSlice);
    const [currentDictionaryInStorage, setCurrentDictionaryInStorage] = useLocaleStorage(
        'currentDictionary',
        'default',
    );
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
    const isDictionaryName = (e: React.FormEvent<HTMLFormElement>, name: string) => {
        e.preventDefault();
        if (!isNotEmpty(name)) {
            dispatch(setServerMessage('Название не должно быть пустым.'));
            return false;
        }
        if (data[name]) {
            dispatch(setServerMessage('Название совпадает с уже существующим словарем.'));
            return false;
        }
        return true;
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
    const [prevTitle, setPrevTitle] = useState<string>(title);
    if (prevTitle !== title) {
        setPrevTitle(title);
        setWordChange('');
        setWordCreate('');
        setWordRemove('');
    }

    if (dictionaryContent.createContent) {
        return (
            <form
                onSubmit={e => {
                    if (!isDictionaryName(e, wordCreate)) return;
                    addNewDictionary(wordCreate, user.email, data, dispatch);
                    dispatch(setCurrentDictionary(wordCreate));
                    dispatch(changeDictionary(wordCreate));
                    setCurrentDictionaryInStorage(wordCreate);
                    setIsModal(false);
                    setSelectedElement(null);
                }}
            >
                <InputAddCard
                    testId="createDictInput"
                    defaultTheme={wordCreate}
                    setDefaultTheme={setWordCreate}
                    dinamicclassname={[style.input, style.inputCreateDictionary].join(' ')}
                    placeholder="Имя словаря..."
                />
                <BtnAddCard children="Создать" type="submit" dinamicclassname={styles.button} />
            </form>
        );
    }
    if (dictionaryContent.changeContent) {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!selectedElement) {
                        dispatch(setServerMessage('Нужно выбрать словарь!'));
                        return;
                    }
                    dispatch(setCurrentDictionary(selectedElement.innerHTML));
                    dispatch(changeDictionary(selectedElement.innerHTML));
                    setCurrentDictionaryInStorage(selectedElement.innerHTML);
                    setIsModal(false);
                    setSelectedElement(null);
                }}
            >
                <ListWithSearching
                    word={wordChange}
                    setWord={setWordChange}
                    inputSearchThemes={inputChangeDictionary}
                    setClearInput={() => clearInput(wordChange, setWordChange, inputChangeDictionary)}
                    onItemClick={e => onOptionClick(e)}
                    array={arrayWithoutCurrentDictionary.filter(element => element !== currentDictionary)}
                    dinamicClassName={styles.listStyle}
                />
                <BtnAddCard children="Сменить" type="submit" dinamicclassname={styles.button} />
            </form>
        );
    }
    if (dictionaryContent.removeContent) {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!selectedElement) {
                        dispatch(setServerMessage('Нужно выбрать словарь!'));
                        return;
                    }
                    if (selectedElement.innerHTML === currentDictionary) {
                        dispatch(setCurrentDictionary('default'));
                        dispatch(changeDictionary('default'));
                    }
                    deleteDictionary(selectedElement.innerHTML, user.email, data, dispatch);
                    setSelectedElement(null);
                }}
            >
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
    const titleClassname = currentDictionary === 'default' ? styles.title : [styles.title, styles.mb30].join(' ');
    return (
        <>
            <h2 className={titleClassname}>Текущий словарь: {cutLongLine(currentDictionary, 16)}</h2>
            {currentDictionary === 'default' && (
                <p className={styles.defaultDictionary}>Это стандартный словарь, его нельзя удалить</p>
            )}
            <BtnAddCard
                children="Сменить"
                dinamicclassname={styles.button}
                onMouseDown={e => {
                    e.stopPropagation();
                    setDictionaryContent({
                        removeContent: false,
                        createContent: false,
                        changeContent: true,
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
                        changeContent: false,
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
                        changeContent: false,
                    });
                }}
            />
        </>
    );
});
export default ModalDictionaryMain;
