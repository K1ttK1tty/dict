import React, { memo } from 'react';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { changeCardFields } from '../../../functions/changeCardFields';
import { addNewTheme } from '../../../functions/addNewTheme';
import { removeModal } from '../../../functions/removeModal';
// styles
import style from './Modal.module.css'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { UpdateCards } from '../../../store/reducers/asyncActions/ActionCreator';
import { setCards } from '../../../store/reducers/authorization/AuthSlice';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
const FormEditCard = memo(function ({ modalChangeCard }) {
    const dispatch = useDispatch();
    const editCard = useSelector(state => state.modalRenameCard.editCard)
    const { changeCard, cards, selectOptions } = useSelector(state => state.AuthSlice)
    const { email } = useSelector(state => state.AuthSlice.user)

    function ChangeCard(e) {
        e.preventDefault();
        const newCards = changeCardFields(cards, changeCard, editCard)
        addNewTheme(selectOptions, editCard.theme, email, dispatch)
        dispatch(UpdateCards({ email, cards: newCards }))
        dispatch(setCards(newCards))
        removeModal(setModal, dispatch)
    };

    return (
        <form>
            <div className={style.inputDiv}>
                <p className={style.inputP}>Word:</p>
                <InputAddCard
                    modalChangeCard={modalChangeCard}
                    inputValue={editCard.word}
                    setValue={e => dispatch(setEditCard({ ...editCard, word: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <div className={style.inputDiv}>
                <p className={style.inputP}>Translate:</p>
                <InputAddCard
                    inputValue={editCard.translate}
                    setValue={e => dispatch(setEditCard({ ...editCard, translate: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <div className={style.inputDiv}>
                <p className={style.inputP}>Theme: </p>
                <InputAddCard
                    inputValue={editCard.theme}
                    setValue={e => dispatch(setEditCard({ ...editCard, theme: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <BtnAddCard aria={'change'} onClick={ChangeCard} dinamicclassname={style.btnFormEditCard} children='Change' />
        </form >
    )
});
export default FormEditCard;