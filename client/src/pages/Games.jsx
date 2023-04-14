import React from 'react';
import { useMemo, useEffect, useState } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom'
import '../styles/Games.css'
import '../styles/theme.css'
//functions and const
import { FGenerate } from '../functions/FGeneration';
import { FGetRandomIng } from '../functions/FGetRandomInt';
import { FValidateQuiz } from '../functions/FValidateQuiz';
import { checkStyle } from '../consts/consts';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setCardsNumber, setInputReq } from '../store/reducers/GamesSlice';
const Games = function () {
    const Cards = useSelector(state => state.Cards.cards)
    const inputReq = useSelector(state => state.GamesSlice.inputReq)
    const cardsNumber = useSelector(state => state.GamesSlice.cardsNumber)
    const changer = useSelector(state => state.GamesSlice.changer)
    const [cardsGame, setCardsGame] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setInputReq(''))
            dispatch(setCardsNumber(0))
        }
    }, []);

    const array = useMemo(() => {
        let arr = [...cardsGame]
        for (let index = 0; index < cardsNumber; index++) {
            arr.push(Cards[FGetRandomIng(Cards.length)])
        }
        return arr
    }, [changer])

    return (
        <div className='gameWrap'>
            <div className="gameCardsField">
                <div className='title'>Self test</div>
                <div className='gameBody'>
                    {Cards.length !== 0 ?
                        <div>
                            <form className='formTitle'>
                                Enter number of words: <InputRequire />
                                <BtnAddCard
                                    onClick={e => FGenerate(e, inputReq, dispatch)}
                                    children={'Generate'}
                                />
                            </form>
                            {array.length !== 0 ?
                                <form className='formCards'>
                                    <CardsRandom cardsGame={array} />
                                    <BtnAddCard
                                        style={checkStyle}
                                        onClick={e => FValidateQuiz(e, array, setCardsGame, dispatch)}
                                        children={'Check'}
                                    />
                                </form>
                                : ''}
                        </div>
                        : <h3 className='noWords'>Добавьте слова!</h3>}
                </div>
            </div>
        </div>
    )
};
export default Games;