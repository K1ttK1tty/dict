// libs
import { FC, useState, useMemo, lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage.ts';
// pages
import Settings from '../pages/Settings.tsx';
// types
import { IOptionState } from '../store/storeModels.ts';
import { TAttachedControls } from '../models/models.ts';
const AppRouter: FC = memo(function () {
    const Games = useMemo(() => lazy(() => import('../pages/Games.tsx')), []);
    const Vocabulary = useMemo(() => lazy(() => import('../pages/Vocabulary.tsx')), []);
    const [isColorsInCards, setIsColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const [isSelectOpen, setIsSelectOpen] = useState<IOptionState>({ open: false, removeMark: false });
    const [isAttached, setIsAttached] = useState<TAttachedControls>({ attach: true, top: '100px', left: '120px' });
    if (useLocation().pathname === '/games' && isSelectOpen.open) {
        setIsSelectOpen({ ...isSelectOpen, open: false });
    }
    const VocabularyInSuspense =
        <Suspense>
            <Vocabulary
                isColorsOnCards={isColorsInCards}
                setIsColorsInCards={setIsColorsInCards}
                isSelectOpen={isSelectOpen}
                setIsSelectOpen={setIsSelectOpen}
                isAttached={isAttached}
                setIsAttached={setIsAttached}
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