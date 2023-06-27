// libs
import { FC } from 'react';
import { isMobile } from 'react-device-detect';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import TextArea from '../../TextArea/TextArea';
// functions
import { changeCardFields } from '../../../../functions/changeCardFields';
import { addNewTheme } from '../../../../functions/addNewTheme';
import { removeCard } from '../../../../functions/removeCard';
// styles
import style from './Modal.module.css';
// icon
import SoundIcon from '../icons/SoundIcon';
// redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { UpdateCards } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import { setCards } from '../../../../store/reducers/authorization/Authorization/AuthSlice';
import { setModal, setEditCard } from '../../../../store/reducers/modalRenameCard';
// types
import { ICard } from '../../../../store/reducers/authorization/Authorization/AuthTypes';
interface IFormEditCard {
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
const FormEditCard: FC<IFormEditCard> = function ({ modalChangeCard }) {
    const dispatch = useAppDispatch();
    const { editCard } = useAppSelector(state => state.modalRenameCard);
    const { changeCard, cards, selectOptions } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    const ChangeCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newCards: ICard[] = changeCardFields(cards, changeCard, editCard);
        addNewTheme(selectOptions, editCard.theme, email, dispatch);
        dispatch(UpdateCards({ email, cards: newCards }));
        dispatch(setCards(newCards));
        dispatch(setModal(false));
    };
    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeCard(editCard.id, cards, email, dispatch);
        dispatch(setModal(false));
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
                {
                    isMobile && <BtnAddCard
                        aria={'Удалить'}
                        onClick={remove}
                        dinamicclassname={[style.btnFormEditCard, style.removeButtonOnMobile].join(' ')}
                        children="Удалить"
                    />
                }
                <BtnAddCard
                    aria={'Изменить'}
                    onClick={ChangeCard}
                    dinamicclassname={style.btnFormEditCard}
                    children="Изменить"
                />
            </div>
        </form >
    );
};
export default FormEditCard;