import React from 'react';
import Games from '../pages/Games';
import Vocabulary from '../pages/Vocabulary';
import Settings from '../pages/Settings';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
const AppRouter = function () {
    const [Cards, setCards] = useState([
        {
            word: 'to compose',
            translate: 'составить,написать',
            theme: 'verb',
        },
        {
            word: 'to suspend',
            translate: 'приостановить, остановить на время или постоянно',
            theme: 'verb',
        },
        {
            word: 'to pretend',
            translate: 'притворятся, симулировать',
            theme: 'verb',
        },
        {
            word: 'to embed',
            translate: 'встраивать ',
            theme: '',
        },
        {
            word: 'explicit',
            translate: 'явный, понятный',
            theme: '',
        },
        {
            word: 'to eject',
            translate: 'выбрасывать, изгонять',
            theme: 'verb',
        },
        {
            word: 'to maintain',
            translate: 'поддерживать, сохранять',
            theme: 'verb',
        },
        {
            word: 'appropriate',
            translate: 'соответствующий, подходящий',
            theme: 'noun',
        },
        {
            word: 'purpose',
            translate: 'цель, назначение, причина существования',
            theme: 'noun',
        },
        {
            word: 'recent',
            translate: 'недавний, недавно появившийся',
            theme: 'noun',
        },
        {
            word: 'confusion',
            translate: 'путаница, замешательство, сметение',
            theme: 'noun',
        }, 
        {
            word: 'particular',
            translate: 'конкретный, особенный',
            theme: 'noun',
        }, 
        {
            word: 'to research',
            translate: 'изучение, исследование',
            theme: 'verb',
        },
        {
            word: 'insight',
            translate: 'понимание решения проблемы, новая идея для...',
            theme: '',
        },
        // {
        //     word: 'to share',
        //     translate: 'делиться',
        //     theme: 'verb',
        // },
        // {
        //     word: 'Value',
        //     translate: 'Значение',
        //     theme: 'noun',
        // },
        // {
        //     word: 'to gather',
        //     translate: 'Собирать, коллекционировать',
        //     theme: 'verb',
        // },
        // {
        //     word: 'to mount',
        //     translate: 'Монтировать, устанавливать',
        //     theme: 'verb',
        // },
        // {
        //     word: 'to confess',
        //     translate: 'Признаваться, сознаваться',
        //     theme: 'verb',
        // },
        // {
        //     word: 'to outclass',
        //     translate: 'Превосходить',
        //     theme: 'verb',
        // },
        // {
        //     word: 'to handle',
        //     translate: 'обрабатывать',
        //     theme: 'verb',
        // },
        // {
        //     word: 'shared',
        //     translate: 'общий',
        //     theme: 'noun',
        // },
        // {
        //     word: '1232',
        //     translate: 'no12341234 1234 1234 1234 1234 123 12 3412 3441 2346dsfg sdfgsdrtgwergsd  sefgewrrgsdfgerg werg sdrg erg werwerun',
        //     theme: 'noun',
        // },
    ]);

    return (
        <Routes>
            <Route path='/posts' element={<Vocabulary Cards={Cards} setCards={setCards}/>}></Route>
            <Route path='/games' element={<Games Cards={Cards} />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='*' element={<Vocabulary Cards={Cards} setCards={setCards}/>} />
        </Routes>
    )
};
export default AppRouter;