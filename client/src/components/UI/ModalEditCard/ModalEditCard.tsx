import { FC, memo } from 'react';
// components
import FormEditCard from './FormEditCard';
import Modal from '../Modal/Modal';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
// types
interface IModalEditCard {
    modalChangeCard: React.MutableRefObject<HTMLInputElement>;
}
const ModalEditCard: FC<IModalEditCard> = memo(function ({ modalChangeCard }) {
    const dispatch = useAppDispatch();
    const { isModalActive } = useAppSelector(state => state.modalRenameCard);

    return (
        <Modal
            title={'Редактирование'}
            isModal={isModalActive}
            setModal={setModal}
            setFields={setEditCard}
            dispatch={dispatch}
            content={<FormEditCard modalChangeCard={modalChangeCard} />}
        />
    );
});
export default ModalEditCard;