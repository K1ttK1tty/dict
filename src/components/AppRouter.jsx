import React from 'react';
import Games from '../pages/Games';
import Vocabulary from '../pages/Vocabulary';
import Settings from '../pages/Settings';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
const AppRouter = function () {

    // const [Cards, setCards] = useState([

    //     // {
    //     //     word: '1232',
    //     //     translate: 'no12341234 1234 1234 1234 1234 123 12 3412 3441 2346dsfg sdfgsdrtgwergsd  sefgewrrgsdfgerg werg sdrg erg werwerun',
    //     //     theme: 'noun',
    //     // },
    // ]);

    return (
        <Routes>
            <Route path='/posts' element={<Vocabulary />} />
            <Route path='/games' element={<Games />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<Vocabulary />} />
        </Routes>
    )
};
export default AppRouter;