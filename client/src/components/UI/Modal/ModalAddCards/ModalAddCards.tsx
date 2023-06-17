import { FC, useState, useEffect, memo } from 'react';
// components
import FormAddCard from './FormAddCard';
import Modal from '../Modal';
//redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setInputValue } from '../../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../../store/reducers/modalAddCard';
// types
interface IModalAddCards {
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
}
const ModalAddCards: FC<IModalAddCards> = memo(function ({ modalAdd }) {
    const dispatch = useAppDispatch();
    const { isModalAddCardActive } = useAppSelector(state => state.modalAddCard);
    const [isModal, setIsModal] = useState<boolean>(false);
    useEffect(() => {
        if (isModalAddCardActive) setIsModal(true);
        return () => {
            dispatch(setInputValue({ id: 0, word: '', translate: '', theme: '' }));
        };
    }, [isModalAddCardActive]);
    useEffect(() => {
        if (!isModal) dispatch(setIsModalAddCardActive(false));
    }, [isModal]);
    return (
        <Modal
            title={'Создание карточки'}
            isModal={isModalAddCardActive}
            setModal={setIsModal}
            setFields={setInputValue}
            content={<FormAddCard modalAdd={modalAdd} />}
        />
    );
});
export default ModalAddCards;