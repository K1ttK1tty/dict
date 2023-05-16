import { FC, memo } from 'react';
import { isMobile } from 'react-device-detect';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { changeCardFields } from '../../../functions/changeCardFields';
import { addNewTheme } from '../../../functions/addNewTheme';
import { removeModal } from '../../../functions/removeModal';
import { removeCard } from '../../../functions/removeCard';
// styles
import style from './Modal.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { UpdateCards } from '../../../store/reducers/authorization/Authorization/ActionCreator';
import { setCards } from '../../../store/reducers/authorization/Authorization/AuthSlice';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
// types
interface IFormEditCard {
    modalChangeCard: React.MutableRefObject<HTMLInputElement>;
}
const FormEditCard: FC<IFormEditCard> = memo(function ({ modalChangeCard }) {
    const dispatch = useAppDispatch();
    const editCard = useAppSelector(state => state.modalRenameCard.editCard);
    const { changeCard, cards, selectOptions } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    const ChangeCard = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newCards = changeCardFields(cards, changeCard, editCard);
        addNewTheme(selectOptions, editCard.theme, email, dispatch);
        dispatch(UpdateCards({ email, cards: newCards }));
        dispatch(setCards(newCards));
        removeModal(setModal, dispatch);
    };
    const remove = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeCard(editCard.id, cards, email, dispatch);
        removeModal(setModal, dispatch);
    };
    return (
        <form>
            <div className={style.inputDiv}>
                <div className={style.inputP}>Слово:</div>
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
});
export default FormEditCard;