import React from 'react';
import { useState } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import Gamescss from '../styles/Games.css'
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
const Games = function ({ Cards }) {
    const [inputReq, setInputReq] = useState('');
    const [numb, setNumb] = useState();



    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    //5
    function generate(e) {
        e.preventDefault();
        setNumb(inputReq);
    };





    // for (let index = 0; index < 3; index++) {
    //     console.log(Cards[getRandomInt(Cards.length)])
    // }

    return (
        <div className='gameWrap'>
            <div className="CardsField">
                <div className='wrap'>
                    <div style={{ width: '50%', margin: '0px auto' }}>
                        
                        <form>
                            Введите количество слов: <InputRequire style={{ marginRight: '8px' }} inputReq={inputReq} setInputReq={setInputReq} />
                            <BtnAddCard onClick={generate} type='submit'>Сгенериовать</BtnAddCard>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
};
export default Games;