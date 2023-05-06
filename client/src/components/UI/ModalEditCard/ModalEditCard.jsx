import React, { memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal/Modal';
// redux
import { useSelector } from 'react-redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
const ModalEditCard = memo(function ({ modalChangeCard }) {
    const { isModalActive } = useSelector(state => state.modalRenameCard)

    return (
        <Modal
            title={'Редактирование'}
            isModal={isModalActive}
            setModal={setModal}
            setFields={setEditCard}
            content={<FormEditCard modalChangeCard={modalChangeCard} />}
        />
    )
});
export default ModalEditCard;