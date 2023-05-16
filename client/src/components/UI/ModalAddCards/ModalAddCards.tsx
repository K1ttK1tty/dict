import { FC, useEffect, memo } from 'react';
// components
import FormAddCard from './FormAddCard';
import Modal from '../Modal/Modal';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/reducers/modalAddCard';
// types
interface IModalAddCards {
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
}
const ModalAddCards: FC<IModalAddCards> = memo(function ({ modalAdd }) {
    const dispatch = useAppDispatch();
    const { isModalAddCardActive } = useAppSelector(state => state.modalAddCard);

    useEffect(() => {
        return () => { dispatch(setInputValue({ word: '', translate: '', theme: '' })); };
    }, [isModalAddCardActive]);

    return (
        <Modal
            title={'Создание карточки'}
            isModal={isModalAddCardActive}
            setModal={setIsModalAddCardActive}
            setFields={setInputValue}
            dispatch={dispatch}
            content={<FormAddCard modalAdd={modalAdd} />}
        />
    );
});
export default ModalAddCards;