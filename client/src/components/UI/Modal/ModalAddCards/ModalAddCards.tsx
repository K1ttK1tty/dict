import { FC, useState, memo } from 'react';
import FormAddCard from './FormAddCard';
import Modal from '../Modal';
import { setInputValue } from '../../../../store/reducers/modalRenameCard';
import { ModalAddCards } from '../ModalsModels';
const ModalAddCards: FC<ModalAddCards> = memo(function ({ modalAdd, isAddCardModal, setIsAddCardModal }) {
    const [showRelatedCard, setShowRelatedCard] = useState<boolean>(false);
    const [prev, setPrev] = useState<boolean>(isAddCardModal);
    if (isAddCardModal !== prev) {
        setPrev(isAddCardModal);
        setShowRelatedCard(false);
    }
    const title = showRelatedCard ? 'Эта карточка уже существует' : 'Создание карточки';
    return (
        <Modal
            title={title}
            isModal={isAddCardModal}
            setModal={setIsAddCardModal}
            setFields={setInputValue}
            content={
                <FormAddCard
                    showRelatedCard={showRelatedCard}
                    setShowRelatedCard={setShowRelatedCard}
                    setIsAddCardModal={setIsAddCardModal}
                    isAddCardModal={isAddCardModal}
                    modalAdd={modalAdd}
                />
            }
        />
    );
});
export default ModalAddCards;