import { FC, memo, useState } from 'react';

import { addNewCard } from '../../../../functions/addNewCard';
import { debounce } from '../../../../functions/debounce';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import styles from './FormAddCard.module.css';

import { setInputValue } from '../../../../store/reducers/modalRenameCard';
import { ICard } from '../../../../store/storeModels';

import { IFormAddCard } from '../ModalsModels';

import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import Checkbox from '../../Checkbox/Checkbox';
import InputAddCard from '../../InputAddCard/InputAddCard';
import TextArea from '../../TextArea/TextArea';

const FormAddCard: FC<IFormAddCard> = memo(function ({
    modalAdd,
    showRelatedCard,
    setShowRelatedCard,
    setIsAddCardModal,
    isAddCardModal,
}) {
    const dispatch = useAppDispatch();
    const { cards, user, selectOptions, selectedTheme, data, currentDictionary } = useAppSelector(
        state => state.AuthSlice,
    );
    const { inputValue } = useAppSelector(state => state.modalRenameCard);
    const [isOverlap, setIsOverlap] = useState<boolean>(false);
    const [cardWithOverlap, setCardWithOverlap] = useState<ICard | null>(null);
    const [timeId, setTimeId] = useState<ReturnType<typeof setTimeout> | number>(0);
    const [defaultTheme, setDefaultTheme] = useState<string>(selectedTheme);
    const [prevIsModal, setPrevIsModal] = useState<boolean>(isAddCardModal);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    if (prevIsModal !== isAddCardModal) {
        setPrevIsModal(isAddCardModal);
        setIsOverlap(false);
        setDefaultTheme(selectedTheme);
        setIsFavorite(false);
    }
    const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addNewCard(
            e,
            { ...inputValue, theme: defaultTheme, time: Date.now(), color: 'red', favorite: isFavorite },
            setIsAddCardModal,
            cards,
            selectOptions,
            user.email,
            data,
            currentDictionary,
            dispatch,
        );
        setDefaultTheme('');
    };
    const callback = (e: string) => {
        return () => {
            const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
            for (let index = 0; index < newCards.length; index++) {
                const card = newCards[index];
                if (isNotEmpty(e) && card.word.toLowerCase().includes(e.toLowerCase())) {
                    setCardWithOverlap(card);
                    setIsOverlap(true);
                    return;
                }
            }
            setIsOverlap(false);
            setCardWithOverlap(null);
        };
    };
    const firstInputClassName = isOverlap ? [styles.mb36, styles.inputFormAddCard].join(' ') : styles.inputFormAddCard;
    const overlapNote = showRelatedCard ? 'Вернуться (жми)' : 'Посмотреть совпадение (жми)';
    return (
        <form>
            <div className={styles.relative}>
                {showRelatedCard ? (
                    <InputAddCard inputValue={cardWithOverlap?.word} dinamicclassname={firstInputClassName} />
                ) : (
                    <InputAddCard
                        modalAdd={modalAdd}
                        dinamicclassname={firstInputClassName}
                        placeholder={'Слово'}
                        inputValue={inputValue.word}
                        setValue={e => {
                            dispatch(setInputValue({ ...inputValue, word: e }));
                            debounce(timeId, setTimeId, callback(e), 400);
                        }}
                    />
                )}
                {isOverlap && (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            setShowRelatedCard(!showRelatedCard);
                        }}
                        className={styles.isOverlap}
                    >
                        {overlapNote}
                    </button>
                )}
            </div>

            {showRelatedCard ? (
                <>
                    <InputAddCard inputValue={cardWithOverlap?.translate} dinamicclassname={styles.inputFormAddCard} />
                    <InputAddCard inputValue={cardWithOverlap?.theme} dinamicclassname={styles.inputFormAddCard} />
                    <TextArea inputValue={cardWithOverlap?.note} />
                </>
            ) : (
                <>
                    <InputAddCard
                        dinamicclassname={styles.inputFormAddCard}
                        placeholder={'Перевод'}
                        inputValue={inputValue.translate}
                        setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))}
                    />
                    <InputAddCard
                        dinamicclassname={styles.inputFormAddCard}
                        placeholder={'Тема'}
                        defaultTheme={defaultTheme}
                        setDefaultTheme={setDefaultTheme}
                    />
                    <TextArea
                        placeholder="Комментарий..."
                        inputValue={inputValue.note}
                        setValue={e => dispatch(setInputValue({ ...inputValue, note: e }))}
                    />
                </>
            )}
            <div className={styles.mb18}>
                <Checkbox
                    defaultChecked={isFavorite}
                    id={'setFavoriteOrNot'}
                    dinamicClassNameWrapper={styles.mr6}
                    callback={() => setIsFavorite(!isFavorite)}
                />
                Добавить в избранное
            </div>
            <BtnAddCard
                aria={'Создать'}
                dinamicclassname={styles.btnFormAddCard}
                onClick={e => addCard(e)}
                type="submit"
                children="Создать"
            />
        </form>
    );
});
export default FormAddCard;
