import { FC, useState, useEffect, memo } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import TextArea from '../../TextArea/TextArea';
// functions
import { addNewCard } from '../../../../functions/addNewCard';
// consts
import styles from './FormAddCard.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setInputValue } from '../../../../store/reducers/modalRenameCard';
// types
import { IFormAddCard } from '../ModalsModels';
const FormAddCard: FC<IFormAddCard> = memo(function ({ modalAdd }) {
    const dispatch = useAppDispatch();
    const { cards, user, selectOptions, optionName } = useAppSelector(state => state.AuthSlice);
    const { isModalAddCardActive } = useAppSelector(state => state.modalAddCard);

    const { inputValue } = useAppSelector(state => state.modalRenameCard);
    const [defaultTheme, setDefaultTheme] = useState<string>('');
    useEffect(() => {
        if (optionName !== 'Тема' && isModalAddCardActive) {
            setDefaultTheme(optionName);
        } else {
            setDefaultTheme('');
        }
    }, [optionName, isModalAddCardActive]);
    const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addNewCard(e,
            { ...inputValue, theme: defaultTheme, time: Date.now(), color: 'red' },
            cards,
            selectOptions,
            user.email,
            dispatch
        );
        setDefaultTheme('');
    };
    return (
        <form >
            <InputAddCard
                modalAdd={modalAdd}
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Слово'}
                inputValue={inputValue.word}
                setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))}
            />
            <InputAddCard
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Перевод'}
                inputValue={inputValue.translate}
                setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))}
            />
            <InputAddCard
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Тема'}
                defaultTheme={defaultTheme}
                setDefaultTheme={setDefaultTheme}
            />
            <TextArea
                placeholder="Комментарий..."
                inputValue={inputValue.note}
                setValue={e => dispatch(setInputValue({ ...inputValue, note: e }))}
            />
            <BtnAddCard
                aria={'Создать'}
                dinamicclassname={styles.btnFormAddCard}
                onClick={e => addCard(e)}
                type="submit"
                children="Создать"
            />
        </form>
    );
});
export default FormAddCard;