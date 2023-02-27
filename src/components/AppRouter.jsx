import React from 'react';
import Games from '../pages/Games';
import Vocabulary from '../pages/Vocabulary';
import Settings from '../pages/Settings';
import { Routes, Route } from 'react-router-dom';
const AppRouter = function () {
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