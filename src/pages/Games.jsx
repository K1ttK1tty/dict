import React from 'react';
import { useState, useMemo } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import  '../styles/Games.css'
import '../styles/Vocabulary.css'
import  '../styles/theme.css'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom'
//redux
import { useSelector } from 'react-redux';
const Games = function () {

    const Cards = useSelector(state => state.Cards.cards)

    const [inputReq, setInputReq] = useState(''); // number of words
    const [input, setInput] = useState(''); // исправить
    const [numb, setNumb] = useState();
    const [genState, setGenState] = useState(true); // only for get new generate
    let cardsGame = [];
    const [validate, setValidate] = useState([]); //for validate

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const array = useMemo(() => {
        for (let index = 0; index < numb; index++) {
            cardsGame.push(Cards[getRandomInt(Cards.length)])
        };
        setValidate([]);
        return cardsGame
    }, [numb, genState])


    function generate(e) {
        e.preventDefault();
        setNumb(inputReq);
        setGenState(!genState);
        setInputReq('');
        let tt = document.querySelectorAll('.inptReq');
        for (let index = 0; index < tt.length; index++) {
            tt[index].value = '';
        };
    };

    function valudate(e) {
        let state = [];
        e.preventDefault();
        let tt = document.querySelectorAll('.inptReq');
        for (let index = 0; index < tt.length; index++) {
            const input = tt[index];

            const wordInCard = array[index].word.toLowerCase().split(' ').join('');
            let inputValue = input.value.toLowerCase().split(' ').join('');

            if (wordInCard === inputValue) {
                state.push('trueWord')
            } else if (wordInCard.includes(inputValue) && inputValue !== 'to' && inputValue !== '') {
                state.push('almost')

            } else state.push('falseWord')

        };
        cardsGame = [];
        setValidate(state);
    };
    const checkStyle = { margin: '0px auto', display: 'block', width: '20%', padding: '8px' }
    return (
        <div className='gameWrap'>
            <div className="gameCardsField">
                <div className='title'>Self test</div>
                <div className='wrap'>
                    <div style={{ width: '45%', margin: '0px auto' }}>
                        {Cards.length !== 0 ?
                            <div>
                                <form className='formTitle'>
                                    Enter number of words: <InputRequire inputReq={inputReq} setInputReq={setInputReq} />
                                    <BtnAddCard onClick={generate} type='submit'>Generate</BtnAddCard>
                                </form>
                                {array.length !== 0 ?
                                    <form className='formCards'>
                                        <CardsRandom validate={validate} setInput={setInput} cardsGame={array} />
                                        <BtnAddCard style={checkStyle} onClick={e => valudate(e)}>Check</BtnAddCard>
                                    </form>
                                    : ''}
                            </div>
                            : <h3 className='noWords'>Добавьте слова!</h3>}
                    </div>
                </div>
            </div>
        </div >
    )
};
export default Games;