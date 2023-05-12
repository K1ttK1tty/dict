import React, { useEffect, memo } from 'react';
// components
import FormAddCard from './FormAddCard';
import Modal from '../Modal/Modal';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/reducers/modalAddCard';
const ModalAddCards = memo(function ({ modalAdd }) {
    const dispatch = useDispatch()
    const { isModalAddCardActive } = useSelector(state => state.modalAddCard)

    useEffect(() => {
        return () => dispatch(setInputValue({ word: '', translate: '', theme: '' }))
    }, [isModalAddCardActive]);

    return (
        <Modal
            title={'Создание карточки'}
            isModal={isModalAddCardActive}
            setModal={setIsModalAddCardActive}
            setFields={setInputValue}
            dispatch={dispatch}
            content={<FormAddCard modalAdd={modalAdd} />}
        />
    )
});
export default ModalAddCards;