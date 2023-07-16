// libs
import { FC, useState, useMemo, lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage.ts';
// types
import { IOptionState } from '../store/storeModels.ts';
import { TAttachedControls } from '../models/models.ts';
import { TSelectColorOrNew } from './UI/MySelect/MySelectModel.ts';
const AppRouter: FC = memo(function () {
    const Games = useMemo(() => lazy(() => import('../pages/Games.tsx')), []);
    const Vocabulary = useMemo(() => lazy(() => import('../pages/Vocabulary.tsx')), []);
    const Settings = useMemo(() => lazy(() => import('../pages/Settings.tsx')), []);

    const [isColorsInCards, setIsColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const [isTwoColumns, setIsTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
    const [showNewLabel, setShowNewLabel] = useLocaleStorage('showNewLabel', true);
    const [order, setOrder] = useLocaleStorage('order', true);
    const [isSelectOpen, setIsSelectOpen] = useState<IOptionState>({ open: false, removeMark: false });
    const [isAttached, setIsAttached] = useState<TAttachedControls>({ attach: true, top: '100px', left: '120px' });
    const [selectedColorOrNewLabel, setSelectedColorOrNewLabel] = useState<TSelectColorOrNew | null>(null);
    if (useLocation().pathname === '/games' && isSelectOpen.open) {
        setIsSelectOpen({ ...isSelectOpen, open: false });
    }
    const VocabularyInSuspense =
        <Suspense>
            <Vocabulary
                isTwoColumns={isTwoColumns}
                isColorsInCards={isColorsInCards}
                isSelectOpen={isSelectOpen}
                setIsSelectOpen={setIsSelectOpen}
                isAttached={isAttached}
                setIsAttached={setIsAttached}
                showNewLabel={showNewLabel}
                order={order}
                selectedColorOrNewLabel={selectedColorOrNewLabel}
                setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
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
            <Route path="/settings" element={
                <Suspense>
                    <Settings
                        isColorsInCards={isColorsInCards}
                        setIsColorsInCards={setIsColorsInCards}
                        isTwoColumns={isTwoColumns}
                        setIsTwoColumns={setIsTwoColumns}
                        showNewLabel={showNewLabel}
                        setShowNewLabel={setShowNewLabel}
                        order={order}
                        setOrder={setOrder}
                    />
                </Suspense>
            } />
            <Route
                path="*"
                element={VocabularyInSuspense} />
        </Routes>
    );
});
export default AppRouter;