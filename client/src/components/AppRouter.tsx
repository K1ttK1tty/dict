// libs
import { FC, useState, useMemo, lazy, Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import Settings from '../pages/Settings.tsx';
const AppRouter: FC = memo(function () {
    const Games = useMemo(() => lazy(() => import('../pages/Games.tsx')), []);
    const Vocabulary = useMemo(() => lazy(() => import('../pages/Vocabulary.tsx')), []);
    const [doubleRowCards, setDoubleRowCards] = useState<boolean>(false);
    const [wordsOrder, setWordsOrder] = useState<boolean>(true);
    return (
        <Routes>
            <Route path="/posts" element={
                <Suspense>
                    <Vocabulary
                        doubleRowCards={doubleRowCards}
                        setDoubleRowCards={setDoubleRowCards}
                        wordsOrder={wordsOrder}
                        setWordsOrder={setWordsOrder}
                    />
                </Suspense>
            }
            />
            <Route path="/games" element={
                <Suspense>
                    <Games />
                </Suspense>
            } />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={
                <Suspense>
                    <Vocabulary
                        doubleRowCards={doubleRowCards}
                        setDoubleRowCards={setDoubleRowCards}
                        wordsOrder={wordsOrder}
                        setWordsOrder={setWordsOrder}
                    />
                </Suspense>
            } />
        </Routes>
    );
});
export default AppRouter;