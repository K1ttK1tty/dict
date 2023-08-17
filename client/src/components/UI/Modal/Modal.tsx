import { FC, memo } from 'react';
import { isMobile } from 'react-device-detect';

import { switchFavorite } from '../../../functions/changeFavoriteCard';
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import arrowStyles from '../Authorization/ResetPassword/ResetPassword.module.css';
import style from './ModalEditCard/Modal.module.css';

import { setEditCard } from '../../../store/reducers/modalRenameCard';

import { IModal } from './ModalsModels';

import FavoriteIcon from '../../../pages/Icons/FavoriteIcon';

const Modal: FC<IModal> = memo(function ({
    title,
    content,
    isModal,
    setModal,
    setFields,
    dinamicClassName,
    back,
    backFunc,
    testid,
}) {
    const { editCard } = useAppSelector(state => state.modalRenameCard);
    const { cards, currentDictionary, selectOptions, user, data } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();
    const visible = isModal ? [style.modal, style.active].join(' ') : style.modal;
    const titleClassName = back ? [style.modalTitle, style.ml30].join(' ') : style.modalTitle;
    const isAvatarModal = 'Загрузка нового аватара';
    const displayFavoriteButton = title === 'Редактирование';
    const changeFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        switchFavorite(cards, editCard.id, currentDictionary, selectOptions, user.email, data, dispatch);
        dispatch(setEditCard({ ...editCard, favorite: !editCard.favorite }));
    };
    return (
        <div
            data-testid={testid}
            tabIndex={1}
            className={visible}
            onKeyDown={e => keyClose(e, setModal, dispatch, setFields)}
            onMouseDown={() => removeModal(setModal, dispatch, setFields)}
        >
            <div onMouseDown={e => e.stopPropagation()} className={[style.modalContent, dinamicClassName].join(' ')}>
                <div className={style.modalMarg}>
                    <div className={style.modalNav}>
                        <h5 className={titleClassName}>
                            {back && (
                                <div onMouseDown={backFunc} className={[arrowStyles.icon, style.backArrow].join(' ')}>
                                    <div className={arrowStyles.arrow}></div>
                                </div>
                            )}
                            {title}
                            {displayFavoriteButton && isMobile && (
                                <button onClick={e => changeFavorite(e)} className="disableButtonAppearance">
                                    <FavoriteIcon isFavorite={editCard.favorite} />
                                </button>
                            )}
                        </h5>
                        <button
                            data-testid="modalCloseButton"
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
