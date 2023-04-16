import React from 'react';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { addNewCard } from '../../../functions/addNewCard';
// consts
import { styles } from '../../../consts/consts';
import { btnStyleModalAddCards } from '../../../consts/consts';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
const FormAddCard = function ({ modalAdd }) {
    const dispatch = useDispatch()
    const { cards, user, selectOptions } = useSelector(state => state.AuthSlice)
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)

    return (
        <form>
            <InputAddCard
                modalAdd={modalAdd}
                style={styles} placeholder={'Word'}
                inputValue={inputValue.word}
                setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))}
            />
            <InputAddCard
                style={styles}
                placeholder={'Translate'}
                inputValue={inputValue.translate}
                setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))}
            />
            <InputAddCard
                style={styles}
                placeholder={'Theme'}
                inputValue={inputValue.theme}
                setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))}
            />
            <BtnAddCard
                aria={'Create'}
                style={btnStyleModalAddCards}
                onClick={e => addNewCard(e, inputValue, cards, selectOptions, user.email, dispatch)}
                type='submit'
                children='Create'
            />
        </form>
    )
};
export default FormAddCard;