import { FC, memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal';
// redux
import { setEditCard } from '../../../../store/reducers/modalRenameCard';
// types
import { IModalEditCard } from '../ModalsModels';
const ModalEditCard: FC<IModalEditCard> = memo(function ({ modalChangeCard, isEditCardModal, setIsEditCardModal }) {

    return (
        <Modal
            title={'Редактирование'}
            isModal={isEditCardModal}
            setModal={setIsEditCardModal}
            setFields={setEditCard}
            content={
                <FormEditCard
                    modalChangeCard={modalChangeCard}
                    setIsEditCardModal={setIsEditCardModal}
                />}
        />
    );
});
export default ModalEditCard;