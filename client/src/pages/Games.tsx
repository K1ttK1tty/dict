// libs
import { FC, useState, useEffect, useMemo, memo } from 'react';
// components
import InputAddCard from '../components/UI/InputAddCard/InputAddCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom';
import Checkbox from '../components/UI/Checkbox/Checkbox';
// functions
import { generateQuizWords } from '../functions/generateQuizWords';
import { getRandomIng } from '../functions/getRandomInt';
import { validateQuiz } from '../functions/validateQuiz';
// styles
import '../styles/Games.css';
import '../styles/theme.css';
import inputStyle from '../components/UI/Modal/ModalAddCards/FormAddCard.module.css';
import CheckboxChoice from '../components/UI//InputSearch/InputSearch.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCardsNumber, setInputReq, setChanger } from '../store/reducers/GamesSlice';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
const Games: FC = memo(function () {
    const [testByWord, setTestByWord] = useState<boolean>(true);
    const searchByWordClassName = testByWord ? CheckboxChoice.underline : '';
    const searchByTranslateClassName = testByWord ? '' : CheckboxChoice.underline;

    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.AuthSlice);
    const {
        inputReq,
        cardsNumber,
        changer
    } = useAppSelector(state => state.GamesSlice);
    const setInputWordsCount = (value: string | number) => {
        dispatch(setInputReq(Number(value)));
    };

    useEffect(() => {
        return () => {
            dispatch(setInputReq(0));
            dispatch(setCardsNumber(0));
        };
    }, [dispatch]);
    useEffect(() => {
        dispatch(setInputReq(0));
        dispatch(setCardsNumber(0));
        dispatch(setChanger());
    }, [testByWord, dispatch]);

    const array = useMemo(() => {
        const arr: ICard[] = [];
        for (let index = 0; index < cardsNumber; index++) {
            arr.push(cards[getRandomIng(cards.length)]);
        }
        return arr;
    }, [changer]);
    return (
        <div className="gameWrap pageContent">
            <div className="gameCardsField">
                <div className="title">Самопроверка</div>
                <div className="title">
                    По <span className={searchByWordClassName}>слову</span>/
                    <span className={searchByTranslateClassName}>переводу</span>:
                    <Checkbox
                        id={'wordOrTranslateSelfTest'}
                        defaultChecked={testByWord}
                        callback={() => setTestByWord(!testByWord)}
                    />
                </div>
                <div className="gameBody">
                    {
                        cards.length ?
                            <div>
                                <form className="formTitle">
                                    <div className={'mr6 mb12'}>
                                        Введите количество слов:
                                        <InputAddCard
                                            dinamicclassname={inputStyle.inputFormAddCard + ' inputEnterWordsCount'}
                                            inputValue={inputReq ? inputReq : ''}
                                            setValue={setInputWordsCount}
                                            type="number"
                                        />
                                    </div>
                                    <BtnAddCard
                                        onClick={e => generateQuizWords(e, inputReq, dispatch)}
                                        children={'Сгенерировать'}
                                    />
                                </form>
                                {
                                    array.length > 0 &&
                                    <form className="formCards">
                                        <CardsRandom cardsGame={array} testByWord={testByWord} />
                                        <BtnAddCard
                                            dinamicclassname={'btnGamesCheck'}
                                            onClick={e => validateQuiz(e, array, testByWord, dispatch)}
                                            children={'Проверить'}
                                        />
                                    </form>
                                }
                            </div>
                            : <h3 className="noWords">Добавьте слова!</h3>
                    }
                </div>
            </div>
        </div>
    );
});
export default Games;