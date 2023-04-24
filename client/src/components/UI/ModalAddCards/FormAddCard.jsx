import React, { memo } from 'react';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { addNewCard } from '../../../functions/addNewCard';
// consts
// import { styles } from '../../../consts/consts';
import styles from './FormAddCard.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
const FormAddCard = memo(function ({ modalAdd }) {
    const dispatch = useDispatch()
    const { cards, user, selectOptions } = useSelector(state => state.AuthSlice)
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    return (
        <form >
            <InputAddCard
                modalAdd={modalAdd}
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Word'}
                inputValue={inputValue.word}
                setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))}
            />
            <InputAddCard
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Translate'}
                inputValue={inputValue.translate}
                setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))}
            />
            <InputAddCard
                dinamicclassname={styles.inputFormAddCard}
                placeholder={'Theme'}
                inputValue={inputValue.theme}
                setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))}
            />
            <BtnAddCard
                aria={'Создать'}
                dinamicclassname={styles.btnFormAddCard}
                onClick={e => addNewCard(e, inputValue, cards, selectOptions, user.email, dispatch)}
                type='submit'
                children='Создать'
            />
        </form>
    )
});
export default FormAddCard;