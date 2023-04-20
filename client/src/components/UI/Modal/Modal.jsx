import React, { memo } from 'react';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import style from '../ModalEditCard/Modal.module.css'
const Modal = memo(function ({ title, content, isModal, setModal, setFields, dispatch }) {

    let visible = isModal
        ? [style.modal, style.active].join(' ')
        : style.modal;


    return (
        <div
            tabIndex={'1'}
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
                            aria-label="close"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {content}

            </div>
        </div>
    )
});
export default Modal;