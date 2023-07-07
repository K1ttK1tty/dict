// libs
import { FC, useState, useMemo, lazy, Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage.ts';
// pages
import Settings from '../pages/Settings.tsx';
const AppRouter: FC = memo(function () {
    const Games = useMemo(() => lazy(() => import('../pages/Games.tsx')), []);
    const Vocabulary = useMemo(() => lazy(() => import('../pages/Vocabulary.tsx')), []);

    const [doubleRowCards, setDoubleRowCards] = useState<boolean>(false);
    const [wordsOrder, setWordsOrder] = useState<boolean>(true);
    const [isColorsInCards, setIsColorsInCards] = useLocaleStorage('isColorsOnCards', true);

    return (
        <Routes>
            <Route
                path="/posts"
                element={
                    <Suspense>
                        <Vocabulary
                            doubleRowCards={doubleRowCards}
                            setDoubleRowCards={setDoubleRowCards}
                            wordsOrder={wordsOrder}
                            setWordsOrder={setWordsOrder}
                            isColorsOnCards={isColorsInCards}
                            setIsColorsInCards={setIsColorsInCards}
                        />
                    </Suspense>
                }
            />
            <Route
                path="/games"
                element={
                    <Suspense>
                        <Games />
                    </Suspense>
                } />
            <Route path="/settings" element={<Settings />} />
            <Route
                path="*"
                element={
                    <Suspense>
                        <Vocabulary
                            doubleRowCards={doubleRowCards}
                            setDoubleRowCards={setDoubleRowCards}
                            wordsOrder={wordsOrder}
                            setWordsOrder={setWordsOrder}
                            isColorsOnCards={isColorsInCards}
                            setIsColorsInCards={setIsColorsInCards}
                        />
                    </Suspense>
                } />
        </Routes>
    );
});
export default AppRouter;