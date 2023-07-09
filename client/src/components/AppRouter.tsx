// libs
import { FC, useMemo, lazy, Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage.ts';
// pages
import Settings from '../pages/Settings.tsx';
const AppRouter: FC = memo(function () {
    const Games = useMemo(() => lazy(() => import('../pages/Games.tsx')), []);
    const Vocabulary = useMemo(() => lazy(() => import('../pages/Vocabulary.tsx')), []);
    const [isColorsInCards, setIsColorsInCards] = useLocaleStorage('isColorsOnCards', true);

    return (
        <Routes>
            <Route
                path="/posts"
                element={
                    <Suspense>
                        <Vocabulary
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
                            isColorsOnCards={isColorsInCards}
                            setIsColorsInCards={setIsColorsInCards}
                        />
                    </Suspense>
                } />
        </Routes>
    );
});
export default AppRouter;