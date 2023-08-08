import { FC, memo } from 'react';

import { setEditCard } from '../../../../store/reducers/modalRenameCard';

import { IModalEditCard } from '../ModalsModels';

import Modal from '../Modal';
import FormEditCard from './FormEditCard';

const ModalEditCard: FC<IModalEditCard> = memo(function ({ modalChangeCard, isEditCardModal, setIsEditCardModal }) {
    return (
        <Modal
            testid="ModalEditCard"
            title={'Редактирование'}
            isModal={isEditCardModal}
            setModal={setIsEditCardModal}
            setFields={setEditCard}
            content={<FormEditCard modalChangeCard={modalChangeCard} setIsEditCardModal={setIsEditCardModal} />}
        />
    );
});
export default ModalEditCard;
