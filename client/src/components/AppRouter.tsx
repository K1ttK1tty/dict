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

    const VocabularyInSuspense =
        <Suspense>
            <Vocabulary
                isColorsOnCards={isColorsInCards}
                setIsColorsInCards={setIsColorsInCards}
            />
        </Suspense>;

    return (
        <Routes>
            <Route
                path="/posts"
                element={VocabularyInSuspense}
            />
            <Route
                path="/games"
                element={
                    <Suspense>
                        <Games isColorsInCards={isColorsInCards} />
                    </Suspense>
                } />
            <Route path="/settings" element={<Settings />} />
            <Route
                path="*"
                element={VocabularyInSuspense} />
        </Routes>
    );
});
export default AppRouter;