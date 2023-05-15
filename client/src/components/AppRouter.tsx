import { Routes, Route } from 'react-router-dom';
// pages
import Games from '../pages/Games.tsx';
import Vocabulary from '../pages/Vocabulary.tsx';
import Settings from '../pages/Settings.tsx';
const AppRouter = function () {
    return (
        <Routes>
            <Route path="/posts" element={<Vocabulary />} />
            <Route path="/games" element={<Games />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Vocabulary />} />
        </Routes>
    );
};
export default AppRouter;