import { FC, useState, useEffect, memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal';
// redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setModal, setEditCard } from '../../../../store/reducers/modalRenameCard';
// types
import { IFormEditCard } from '../ModalsModels';
const ModalEditCard: FC<IFormEditCard> = memo(function ({ modalChangeCard }) {
    const dispatch = useAppDispatch();
    const { isModalActive } = useAppSelector(state => state.modalRenameCard);
    const [isModal, setIsModal] = useState<boolean>(false);
    useEffect(() => {
        if (isModalActive) setIsModal(true);
    }, [isModalActive]);

    useEffect(() => {
        if (!isModal) dispatch(setModal(false));
    }, [isModal, dispatch]);

    return (
        <Modal
            title={'Редактирование'}
            isModal={isModalActive}
            setModal={setIsModal}
            setFields={setEditCard}
            content={<FormEditCard modalChangeCard={modalChangeCard} />}
        />
    );
});
export default ModalEditCard;