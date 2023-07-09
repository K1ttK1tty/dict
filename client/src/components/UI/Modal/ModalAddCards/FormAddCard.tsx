import { FC, useState, useEffect, memo } from 'react';
// components
import InputAddCard from '../../InputAddCard/InputAddCard';
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import TextArea from '../../TextArea/TextArea';
// functions
import { addNewCard } from '../../../../functions/addNewCard';
import { isNotEmpty } from '../../../../functions/isNotEmpty';
// consts
import styles from './FormAddCard.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setInputValue } from '../../../../store/reducers/modalRenameCard';
// types
import { IFormAddCard } from '../ModalsModels';
import { ICard } from '../../../../store/reducers/authorization/Authorization/AuthTypes';
const FormAddCard: FC<IFormAddCard> = memo(function ({ modalAdd, showRelatedCard, setShowRelatedCard }) {
    const [defaultTheme, setDefaultTheme] = useState<string>('');
    const [isOverlap, setIsOverlap] = useState<boolean>(false);
    const [cardWithOverlap, setCardWithOverlap] = useState<ICard | null>(null);
    const [timeId, setTimeId] = useState<ReturnType<typeof setTimeout>>();

    const dispatch = useAppDispatch();
    const { cards, user, selectOptions, optionName } = useAppSelector(state => state.AuthSlice);
    const { isModalAddCardActive } = useAppSelector(state => state.modalAddCard);
    const { inputValue } = useAppSelector(state => state.modalRenameCard);

    useEffect(() => {
        if (optionName !== 'Тема' && isModalAddCardActive) {
            setDefaultTheme(optionName);
        } else {
            setDefaultTheme('');
            setIsOverlap(false);
        }
        return () => {
            setDefaultTheme('');
            setIsOverlap(false);
            setCardWithOverlap(null);
        };
    }, [optionName, isModalAddCardActive]);

    const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addNewCard(e,
            { ...inputValue, theme: defaultTheme, time: Date.now(), color: 'red' },
            cards,
            selectOptions,
            user.email,
            dispatch
        );
        setDefaultTheme('');
    };

    const findOverlap = (e: string) => {
        clearTimeout(timeId);
        setTimeId(setTimeout(() => {
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
        }, 400));
    };
    const firstInputClassName = isOverlap
        ? [styles.mb36, styles.inputFormAddCard].join(' ')
        : styles.inputFormAddCard;
    const overlapNote = showRelatedCard
        ? 'Вернуться (жми)'
        : 'Посмотреть совпадение (жми)';

    return (
        <form >
            <div className={styles.relative}>
                {
                    showRelatedCard
                        ? <InputAddCard
                            inputValue={cardWithOverlap?.word}
                            dinamicclassname={firstInputClassName}
                        />
                        : <InputAddCard
                            modalAdd={modalAdd}
                            dinamicclassname={firstInputClassName}
                            placeholder={'Слово'}
                            inputValue={inputValue.word}
                            setValue={
                                e => {
                                    dispatch(setInputValue({ ...inputValue, word: e }));
                                    findOverlap(e);
                                }
                            }
                        />
                }
                {
                    isOverlap &&
                    <button
                        onClick={e => {
                            e.preventDefault();
                            setShowRelatedCard(!showRelatedCard);
                        }}
                        className={styles.isOverlap}
                    >
                        {overlapNote}
                    </button>
                }
            </div>

            {
                showRelatedCard ?
                    <>
                        <InputAddCard
                            inputValue={cardWithOverlap?.translate}
                            dinamicclassname={styles.inputFormAddCard}
                        />
                        <InputAddCard
                            inputValue={cardWithOverlap?.theme}
                            dinamicclassname={styles.inputFormAddCard}
                        />
                        <TextArea
                            inputValue={cardWithOverlap?.note}
                        />
                    </>
                    :
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
            }
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