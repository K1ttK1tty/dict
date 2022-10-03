import React from 'react';
import { useState, useMemo } from 'react';
import InputRequire from '../components/UI/InputRequire/InputRequire'
import Gamescss from '../styles/Games.css'
import vocabularyCss from '../styles/Vocabulary.css'
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom'
const Games = function ({ Cards }) {
    const [inputReq, setInputReq] = useState('');
    const [numb, setNumb] = useState();
    let cardsGame = [];
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    //5


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







    // export const useCards = (Cards,searchWord, chooseTheme) => {
    //     const selectedThemes = useSelectedThemes(Cards, chooseTheme)

    //     const selectedAndSearchedWord = useMemo(() => {
    //         return selectedThemes.filter(card => card.theme.toLowerCase().includes(searchWord.toLowerCase())); // перепутаны местами
    //     }, [selectedThemes, searchWord])

    //     return selectedAndSearchedWord
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

                        <CardsRandom cardsGame={cardsGame} />




                    </div>
                </div>
            </div>
        </div >
    )
};
export default Games;