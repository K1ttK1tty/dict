// libs
import { FC, memo } from 'react';
import { useMemo, useEffect } from 'react';
// components
import InputRequire from '../components/UI/InputRequire/InputRequire';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom';
// functions
import { generateQuizWords } from '../functions/generateQuizWords';
import { getRandomIng } from '../functions/getRandomInt';
import { validateQuiz } from '../functions/validateQuiz';
// styles
import '../styles/Games.css';
import '../styles/theme.css';
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCardsNumber, setInputReq } from '../store/reducers/GamesSlice';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
const Games: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.AuthSlice);
    const {
        inputReq,
        cardsNumber,
        changer
    } = useAppSelector(state => state.GamesSlice);

    useEffect(() => {
        return () => {
            dispatch(setInputReq(0));
            dispatch(setCardsNumber(0));
        };
    }, []);
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
                <div className="gameBody">
                    {
                        cards.length ?
                            <div>
                                <form className="formTitle">
                                    Введите количество слов: <InputRequire />
                                    <BtnAddCard
                                        onClick={e => generateQuizWords(e, inputReq, dispatch)}
                                        children={'Сгенерировать'}
                                    />
                                </form>
                                {
                                    array.length > 0 &&
                                    <form className="formCards">
                                        <CardsRandom cardsGame={array} />
                                        <BtnAddCard
                                            dinamicclassname={'btnGamesCheck'}
                                            onClick={e => validateQuiz(e, array, dispatch)}
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