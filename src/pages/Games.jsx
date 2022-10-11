import React from 'react';
import { useState, useMemo } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import Gamescss from '../styles/Games.css'
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom'
const Games = function ({ Cards }) {
    const [inputReq, setInputReq] = useState(''); // для приёма числа слов
    const [input, setInput] = useState('');
    const [numb, setNumb] = useState(); // 
    const [value, setValue] = useState(''); // для очищения полей
    let cardsGame = [];
    const [validate, setValidate] = useState([]); // для проверки
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    const array = useMemo(() => {
        for (let index = 0; index < numb; index++) {
            cardsGame.push(Cards[getRandomInt(Cards.length)])
        };
        setValidate([]);
        return cardsGame
    }, [numb])

    function generate(e) {
        e.preventDefault();
        setNumb(inputReq);
        setInputReq('');
        setValue('')

        let tt = document.querySelectorAll('.inptReq');
        for (let index = 0; index < tt.length; index++) {
            tt[index].value = ''
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

            if (wordInCard == inputValue) {
                state.push('trueWord')
            } else if (wordInCard.includes(inputValue) && inputValue != 'to' && inputValue != '') {
                state.push('almost')

            } else state.push('falseWord')

        };
        cardsGame = [];
        setValidate(state);
    };

    return (
        <div className='gameWrap'>
            <div className="gameCardsField">
                <div className='title'>Самопроверка</div>
                <div className='wrap'>
                    <div style={{ width: '60%', margin: '0px auto' }}>

                        <form style={{ margin: '0px auto 50px', color: 'white' }}>
                            Введите количество слов: <InputRequire style={{ marginRight: '8px' }} inputReq={inputReq} setInputReq={setInputReq} />
                            <BtnAddCard onClick={generate} type='submit'>Сгенериовать</BtnAddCard>
                        </form>

                        <form style={{ margin: '0px auto', marginBottom: '50px', color: 'white' }}>
                            <CardsRandom validate={validate} input={input} setInput={setInput} cardsGame={array} />
                            <BtnAddCard onClick={e => valudate(e)}>Проверить</BtnAddCard>
                        </form>


                    </div>
                </div>
            </div>
        </div >
    )
};
export default Games;