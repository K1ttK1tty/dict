import React from 'react';
import { useState, useMemo } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import Gamescss from '../styles/Games.css'
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom'
const Games = function ({ Cards }) {
    const [inputReq, setInputReq] = useState('');
    const [input, setInput] = useState('');
    const [numb, setNumb] = useState();
    let cardsGame = [];
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function generate(e) {
        e.preventDefault();
        setNumb(inputReq);
        setInputReq('');
    };

    const array = useMemo(() => {
        for (let index = 0; index < numb; index++) {
            cardsGame.push(Cards[getRandomInt(Cards.length)])
        }

        return cardsGame

    }, [numb])
    let trueOrFalse = '';
    function valudate(e) {
        e.preventDefault();
        let tt = document.querySelectorAll('.inptReq');
        for (let index = 0; index < tt.length; index++) {
            const element = tt[index];
            console.log(element.value.trim())
            // console.log(array[index].word)



            if (array[index].word.trim().toLowerCase() == element.value.trim().toLowerCase()) {
                console.log(1)
            } else console.log(0)
        }

    }
 


    return (
        <div className='gameWrap'>
            <div className="CardsField">
                <div className='wrap'>
                    <div style={{ width: '50%', margin: '0px auto' }}>

                        <form style={{ marginBottom: '50px', color: 'white' }}>
                            Введите количество слов: <InputRequire style={{ marginRight: '8px' }} inputReq={inputReq} setInputReq={setInputReq} />
                            <BtnAddCard onClick={generate} type='submit'>Сгенериовать</BtnAddCard>
                        </form>


                        <form>
                            <CardsRandom input={input} setInput={setInput} cardsGame={array} />
                            <BtnAddCard onClick={e => valudate(e)}>Проверить</BtnAddCard>
                        </form>





                    </div>
                </div>
            </div>
        </div >
    )
};
export default Games;