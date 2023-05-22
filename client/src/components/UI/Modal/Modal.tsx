import { FC, memo } from 'react';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import style from '../ModalEditCard/Modal.module.css';
// redux
import { useAppDispatch } from '../../../hooks/redux';
// types
import { } from '../../../hooks/redux';
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
interface IModal {
    title: string;
    content: React.ReactNode;
    isModal: boolean;
    setModal?: (state: boolean) => void;
    setFields?: ActionCreatorWithPayload<(ICard)>;
}
const Modal: FC<IModal> = memo(function ({ title, content, isModal, setModal, setFields }) {
    const dispatch = useAppDispatch();
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