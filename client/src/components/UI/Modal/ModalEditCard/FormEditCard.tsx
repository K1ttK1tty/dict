import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { updatedCards } from '../../../../functions/UpdateCards';
import { addNewTheme } from '../../../../functions/addNewTheme';
import { changeCardFields } from '../../../../functions/changeCardFields';
import { removeCard } from '../../../../functions/removeCard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import style from './Modal.module.css';

import { setCards } from '../../../../store/reducers/authorization/Authorization/AuthSlice';
import { setEditCard } from '../../../../store/reducers/modalRenameCard';
import { ICard } from '../../../../store/storeModels';

import { IFormEditCard } from '../ModalsModels';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import InputAddCard from '../../InputAddCard/InputAddCard';
import TextArea from '../../TextArea/TextArea';
import SoundIcon from '../icons/SoundIcon';

const FormEditCard: FC<IFormEditCard> = function ({ modalChangeCard, setIsEditCardModal }) {
    const dispatch = useAppDispatch();
    const { editCard } = useAppSelector(state => state.modalRenameCard);
    const { changeCard, cards, selectOptions, data, currentDictionary } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    const ChangeCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newCards: ICard[] = changeCardFields(cards, changeCard, editCard);
        const newThemes = addNewTheme(selectOptions, editCard.theme, dispatch);
        updatedCards(currentDictionary, email, data, newCards, newThemes, dispatch);
        dispatch(setCards(newCards));
        setIsEditCardModal(false);
    };
    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeCard(editCard.id, cards, email, data, currentDictionary, selectOptions, dispatch);
        setIsEditCardModal(false);
    };
    return (
        <form>
            <div className={style.inputDiv}>
                <div className={style.inputP}>
                    Слово:
                    <SoundIcon />
                </div>
                <InputAddCard
                    modalChangeCard={modalChangeCard}
                    inputValue={editCard.word}
                    setValue={e => dispatch(setEditCard({ ...editCard, word: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <div className={style.inputDiv}>
                <div className={style.inputP}>Перевод:</div>
                <InputAddCard
                    inputValue={editCard.translate}
                    setValue={e => dispatch(setEditCard({ ...editCard, translate: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <div className={style.inputDiv}>
                <div className={style.inputP}>Тема: </div>
                <InputAddCard
                    inputValue={editCard.theme}
                    setValue={e => dispatch(setEditCard({ ...editCard, theme: e }))}
                    dinamicclassname={style.inputFormEditCard}
                />
            </div>
            <TextArea
                placeholder="Комментарий"
                inputValue={editCard.note}
                setValue={e => dispatch(setEditCard({ ...editCard, note: e }))}
            />
            <div className={style.buttonsBlock}>
                {isMobile && (
                    <BtnAddCard
                        aria={'Удалить'}
                        onClick={remove}
                        dinamicclassname={[style.btnFormEditCard, style.removeButtonOnMobile].join(' ')}
                        children="Удалить"
                    />
                )}
                <BtnAddCard
                    aria={'Изменить'}
                    onClick={ChangeCard}
                    dinamicclassname={style.btnFormEditCard}
                    children="Изменить"
                />
            </div>
        </form>
    );
};
export default FormEditCard;
