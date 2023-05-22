import { FC, useState, useEffect, memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal/Modal';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
// types
interface IModalEditCard {
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
const ModalEditCard: FC<IModalEditCard> = memo(function ({ modalChangeCard }) {
    const dispatch = useAppDispatch();
    const { isModalActive } = useAppSelector(state => state.modalRenameCard);
    const [isModal, setIsModal] = useState<boolean>(false);
    useEffect(() => {
        if (isModalActive) setIsModal(true);
    }, [isModalActive]);

    useEffect(() => {
        if (!isModal) dispatch(setModal(false));
    }, [isModal]);

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