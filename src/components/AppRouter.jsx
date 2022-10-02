import React from 'react';
import Games from '../pages/Games';
import Vocabulary from '../pages/Vocabulary';
import Settings from '../pages/Settings';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
const AppRouter = function () {
    const [Cards, setCards] = useState([
        {
            word: 'Value',
            translate: 'Значение',
            theme: 'noun',
        },
        {
            word: 'to gather',
            translate: 'Собирать, коллекционировать',
            theme: 'verb',
        },
        {
            word: 'to mount',
            translate: 'Монтировать, устанавливать',
            theme: 'verb',
        },
        {
            word: 'to confess',
            translate: 'Признаваться, сознаваться',
            theme: 'verb',
        },
        {
            word: 'to outclass',
            translate: 'Превосходить',
            theme: 'verb',
        },
        {
            word: 'to handle',
            translate: 'обрабатывать',
            theme: 'verb',
        },
        {
            word: 'shared',
            translate: 'общий',
            theme: 'noun',
        },
        // {
        //     word: '1232',
        //     translate: 'no12341234 1234 1234 1234 1234 123 12 3412 3441 2346dsfg sdfgsdrtgwergsd  sefgewrrgsdfgerg werg sdrg erg werwerun',
        //     theme: 'noun',
        // },
    ]);



    return (
        <Routes>
            <Route path='/posts' element={<Vocabulary Cards={Cards} setCards={setCards} />}></Route>
            <Route path='/games' element={<Games Cards={Cards} />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='*' element={<Vocabulary />} />
        </Routes>
    )
};
export default AppRouter;