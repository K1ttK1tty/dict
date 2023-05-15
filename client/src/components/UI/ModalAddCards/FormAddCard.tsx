import { FC, memo } from 'react';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { addNewCard } from '../../../functions/addNewCard';
// consts
// import { styles } from '../../../consts/consts';
import styles from './FormAddCard.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
// types
interface IFormAddCard {
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
}
const FormAddCard: FC<IFormAddCard> = memo(function ({ modalAdd }) {
    const dispatch = useAppDispatch();
    const { cards, user, selectOptions } = useAppSelector(state => state.AuthSlice);
    const inputValue = useAppSelector(state => state.modalRenameCard.inputValue);
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
                inputValue={inputValue.theme}
                setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))}
            />
            <BtnAddCard
                aria={'Создать'}
                dinamicclassname={styles.btnFormAddCard}
                onClick={e => addNewCard(e, inputValue, cards, selectOptions, user.email, dispatch)}
                type="submit"
                children="Создать"
            />
        </form>
    );
});
export default FormAddCard;