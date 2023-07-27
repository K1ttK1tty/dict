// libs
import { FC, useState, lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// types
import { IOptionState } from '../store/storeModels.ts';
import { TAttachedControls } from '../models/models.ts';
import { TSelectColorOrNew } from './UI/MySelect/MySelectModel.ts';
// pages
import NotFoundPage from '../pages/NotFoundPage.tsx';
const Games = lazy(() => import('../pages/Games.tsx'));
const Vocabulary = lazy(() => import('../pages/Vocabulary.tsx'));
const Settings = lazy(() => import('../pages/Settings.tsx'));
const Statistics = lazy(() => import('../pages/Statistics.tsx'));
const AppRouter: FC = memo(function () {
    const [isSelectOpen, setIsSelectOpen] = useState<IOptionState>({ open: false, removeMark: false });
    const [isAttached, setIsAttached] = useState<TAttachedControls>({ attach: true, top: '100px', left: '120px' });
    const [selectedColorOrNewLabel, setSelectedColorOrNewLabel] = useState<TSelectColorOrNew | null>(null);
    if (useLocation().pathname === '/games' && isSelectOpen.open) setIsSelectOpen({ ...isSelectOpen, open: false });

    const VocabularyInSuspense =
        <Suspense>
            <Vocabulary
                isSelectOpen={isSelectOpen}
                setIsSelectOpen={setIsSelectOpen}
                isAttached={isAttached}
                setIsAttached={setIsAttached}
                selectedColorOrNewLabel={selectedColorOrNewLabel}
                setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
            />
        </Suspense>;


    return (
        <Routes>
            <Route path="/posts" element={VocabularyInSuspense} />
            <Route path="/" element={VocabularyInSuspense} />
            <Route
                path="/games"
                element={
                    <Suspense>
                        <Games />
                    </Suspense>
                } />
            <Route path="/settings" element={
                <Suspense>
                    <Settings />
                </Suspense>
            } />
            <Route
                path="/statistics"
                element={
                    <Suspense>
                        <Statistics />
                    </Suspense>
                }
            />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    );
});
export default AppRouter;