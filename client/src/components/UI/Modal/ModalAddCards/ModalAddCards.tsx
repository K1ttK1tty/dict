import { FC, useState, useEffect, memo } from 'react';
// components
import FormAddCard from './FormAddCard';
import Modal from '../Modal';
//redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setInputValue } from '../../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../../store/reducers/modalAddCard';
// types
import { ModalAddCards } from '../ModalsModels';
const ModalAddCards: FC<ModalAddCards> = memo(function ({ modalAdd }) {
    const dispatch = useAppDispatch();
    const { isModalAddCardActive } = useAppSelector(state => state.modalAddCard);
    const [showRelatedCard, setShowRelatedCard] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);
    useEffect(() => {
        if (isModalAddCardActive) setIsModal(true);
        return () => {
            dispatch(setInputValue({ id: 0, word: '', translate: '', theme: '', note: '' }));
        };
    }, [isModalAddCardActive, dispatch]);
    useEffect(() => {
        if (!isModal) dispatch(setIsModalAddCardActive(false));
    }, [isModal, dispatch]);

    const title = showRelatedCard ? 'Эта карточка уже существует' : 'Создание карточки';
    return (
        <Modal
            title={title}
            isModal={isModalAddCardActive}
            setModal={setIsModal}
            setFields={setInputValue}
            content={
                <FormAddCard
                    showRelatedCard={showRelatedCard}
                    setShowRelatedCard={setShowRelatedCard}
                    modalAdd={modalAdd}
                />}
        />
    );
});
export default ModalAddCards;