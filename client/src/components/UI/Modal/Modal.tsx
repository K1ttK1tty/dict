import { FC, memo } from 'react';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import style from '../ModalEditCard/Modal.module.css';
// types
import { useAppDispatch } from '../../../hooks/redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IChangeCard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface IModal {
    title: string;
    content: React.ReactNode;
    isModal: boolean;
    setModal: (state: boolean) => void;
    setFields?: ActionCreatorWithPayload<IChangeCard, 'modalRenameCard/setInputValue'>;
    dispatch?: typeof useAppDispatch;
}
const Modal: FC<IModal> = memo(function ({ title, content, isModal, setModal, setFields, dispatch }) {
    const visible = isModal
        ? [style.modal, style.active].join(' ')
        : style.modal;

    const isAvatarModal = 'Загрузка нового аватара';
    return (
        <div
            tabIndex={1}
            className={visible}
            onKeyDown={e => keyClose(e, setModal, dispatch, setFields)}
            onClick={() => removeModal(setModal, dispatch, setFields)}
        >
            <div onClick={e => (e.stopPropagation())} className={style.modalContent}>
                <div className={style.modalMarg}>
                    <div className={style.modalNav}>
                        <h5 className={style.modalTitle}>{title}</h5>
                        <button
                            onClick={() => removeModal(setModal, dispatch, setFields)}
                            className={style.modalClose}
                            aria-label="закрыть"
                        >
                            &times;
                        </button>
                    </div>
                    {title == isAvatarModal && <hr className={style.hr} />}
                </div>
                {content}
            </div>
        </div>
    );
});
export default Modal;