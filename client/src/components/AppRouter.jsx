import React from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import Games from '../pages/Games';
import Vocabulary from '../pages/Vocabulary';
import Settings from '../pages/Settings';
import Authorization from '../components/UI/Authorization/Authorization';
import ChangePassword from '../components/UI/Authorization/ResetPassword/ChangePassword';

import ResetPassword from '../components/UI/Authorization/ResetPassword/ChangePassword';
const AppRouter = function () {
    return (
        <Routes>
            <Route path='/posts' element={<Vocabulary />} />
            <Route path='/games' element={<Games />} />
            <Route path='/settings' element={<Settings />} />

            {/* <Route path='/changePassword' element={<ResetPassword />} /> */}
            {/* <Route path='/forgotPassword' element={<ResetPassword />} /> */}

            <Route path='*' element={<Vocabulary />} />
        </Routes>
    )
};
export default AppRouter;