import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import App from '../../App';
import { dataWithCardsForStatisticsPage, dataWithoutCardsForStatisticsPage } from '../ComponentsTest/TestsConsts';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
afterEach(cleanup);
describe('Statistics Page', () => {
    test('Checking the "no cards" message', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWithoutCardsForStatisticsPage });
        const background = await screen.findByTestId('vocabulary');
        const toStatisticsPageBtn = screen.getByTestId('toStatisticsPageBtn');

        await userEvent.click(toStatisticsPageBtn);
        await screen.findByTestId('statisticsPage');
        expect(screen.getByText('Словами наполни')).not.toBeNull();
        expect(screen.getByText('И страница покажет')).not.toBeNull();
        expect(screen.getByText('Твою статистику...')).not.toBeNull();
        expect(screen.getByText('Автор.')).not.toBeNull();
        expect(screen.queryByText(/Дата регистрации:/i)).toBeNull();
        expect(screen.queryByText('История добавления')).toBeNull();
    });
    test('Checking that there is no "no cards message"', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
        const background = await screen.findByTestId('vocabulary');
        const toStatisticsPageBtn = screen.getByTestId('toStatisticsPageBtn');

        await userEvent.click(toStatisticsPageBtn);
        await screen.findByTestId('statisticsPage');
        expect(screen.queryByText('Словами наполни')).toBeNull();
        expect(screen.queryByText('И страница покажет')).toBeNull();
        expect(screen.queryByText('Твою статистику...')).toBeNull();
        expect(screen.queryByText('Автор.')).toBeNull();
        expect(screen.getByText('Дата регистрации: 23-7-2023')).not.toBeNull();
        expect(screen.getByText('История добавления')).not.toBeNull();
    });
});
