import React, { memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal/Modal';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
const ModalEditCard = memo(function ({ modalChangeCard }) {
    const { isModalActive } = useSelector(state => state.modalRenameCard)
    const dispatch = useDispatch()

    return (
        <Modal
            title={'Edit card'}
            isModal={isModalActive}
            setModal={setModal}
            setFields={setEditCard}
            content={<FormEditCard modalChangeCard={modalChangeCard} />}
            dispatch={dispatch}
        />
    )
});
export default ModalEditCard;