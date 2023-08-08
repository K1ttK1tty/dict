import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { describe, expect, test } from 'vitest';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { authorizationData } from './TestsConsts';

// global.window.URL.createObjectURL = vi.fn(() => 'detail');

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
describe('Routing', () => {
    test('routing between pages', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        expect(screen.queryByTestId('settingsPage')).toBeNull();
        expect(screen.queryByText(/Самопроверка/i)).toBeNull();
        expect(screen.queryByTestId('statisticsPage')).toBeNull();

        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        const toStatisticsPageBtn = screen.getByTestId('toStatisticsPageBtn');

        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);
        expect(screen.queryByTestId('vocabulary')).toBeNull();
        expect(screen.queryByTestId('settingsPage')).toBeNull();
        expect(screen.queryByTestId('statisticsPage')).toBeNull();

        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        expect(screen.queryByTestId('vocabulary')).toBeNull();
        expect(screen.queryByText(/Самопроверка/i)).toBeNull();
        expect(screen.queryByTestId('statisticsPage')).toBeNull();

        await userEvent.click(toStatisticsPageBtn);
        await screen.findByTestId('statisticsPage');
        expect(screen.queryByTestId('vocabulary')).toBeNull();
        expect(screen.queryByText(/Самопроверка/i)).toBeNull();
        expect(screen.queryByTestId('settingsPage')).toBeNull();

        await userEvent.click(toVocabularyPageBtn);
        await screen.findByTestId('vocabulary');
        expect(screen.queryByTestId('settingsPage')).toBeNull();
        expect(screen.queryByText(/Самопроверка/i)).toBeNull();
        expect(screen.queryByTestId('statisticsPage')).toBeNull();
    });
});
