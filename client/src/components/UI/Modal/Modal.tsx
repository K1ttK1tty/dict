import { FC, memo } from 'react';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import style from './ModalEditCard/Modal.module.css';
import arrowStyles from '../Authorization/ResetPassword/ResetPassword.module.css';
// redux
import { useAppDispatch } from '../../../hooks/redux';
// types
import { IModal } from './ModalsModels';
const Modal: FC<IModal> = memo(function (
    {
        title,
        content,
        isModal,
        setModal,
        setFields,
        dinamicClassName,
        back,
        backFunc }) {
    const dispatch = useAppDispatch();
    const visible = isModal
        ? [style.modal, style.active].join(' ')
        : style.modal;
    const titleClassName = back
        ? [style.modalTitle, style.ml30].join(' ')
        : style.modalTitle;
    const isAvatarModal = 'Загрузка нового аватара';
    return (
        <div
            tabIndex={1}
            className={visible}
            onKeyDown={e => keyClose(e, setModal, dispatch, setFields)}
            onMouseDown={() => removeModal(setModal, dispatch, setFields)}
        >
            <div onMouseDown={e => (e.stopPropagation())} className={[style.modalContent, dinamicClassName].join(' ')}>
                <div className={style.modalMarg}>
                    <div className={style.modalNav}>
                        <h5 className={titleClassName}>
                            {
                                back &&
                                <div onMouseDown={backFunc} className={[arrowStyles.icon, style.backArrow].join(' ')}>
                                    <div className={arrowStyles.arrow}></div>
                                </div>
                            }
                            {title}
                        </h5>
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