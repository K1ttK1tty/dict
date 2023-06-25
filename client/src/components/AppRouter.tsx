// libs
import { FC, useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import Games from '../pages/Games.tsx';
import Vocabulary from '../pages/Vocabulary.tsx';
import Settings from '../pages/Settings.tsx';
const AppRouter: FC = memo(function () {
    const [doubleRowCards, setDoubleRowCards] = useState<boolean>(false);
    return (
        <Routes>
            <Route path="/posts" element={
                <Vocabulary
                    doubleRowCards={doubleRowCards}
                    setDoubleRowCards={setDoubleRowCards}
                />
            } />
            <Route path="/games" element={<Games />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={
                <Vocabulary
                    doubleRowCards={doubleRowCards}
                    setDoubleRowCards={setDoubleRowCards}
                />
            } />
        </Routes>
    );
});
export default AppRouter;