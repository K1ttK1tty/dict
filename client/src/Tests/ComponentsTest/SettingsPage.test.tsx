import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { authorizationData } from './TestsConsts';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
afterEach(cleanup);
describe('Settings page', () => {
    test('turn on/off alphabet order', async () => {
        // by default on
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        expect(within(cards[0]).getByText('word1'));
        expect(within(cards[1]).getByText('Word2'));
        expect(within(cards[2]).getByText('word3'));
        expect(within(cards[3]).getByText('Word4'));
        expect(within(cards[4]).getByText('word5'));
        expect(within(cards[5]).getByText('Word6'));

        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        const checkboxies: HTMLInputElement[] = screen.getAllByRole('checkbox');
        await userEvent.click(checkboxies[0]);
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toVocabularyPageBtn);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        expect(within(cards[5]).getByText('Word6'));
        expect(within(cards[4]).getByText('word5'));
        expect(within(cards[3]).getByText('Word4'));
        expect(within(cards[2]).getByText('word3'));
        expect(within(cards[1]).getByText('Word2'));
        expect(within(cards[0]).getByText('word1'));
    });
    test('turn on/off one or two columns', async () => {
        // by default off
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let setCardComponent = screen.getByTestId('setCardComponent');
        expect(setCardComponent.classList.contains('CardsPosition')).toBe(false);

        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        const checkboxies: HTMLInputElement[] = screen.getAllByRole('checkbox');
        await userEvent.click(checkboxies[2]);
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toVocabularyPageBtn);

        setCardComponent = screen.getByTestId('setCardComponent');
        expect(setCardComponent.classList.contains('CardsPosition')).toBe(true);
    });
    test('turn on/off', async () => {
        // by default on
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);

        for (const card of cards) {
            expect(within(card).getByTestId('colorOnCard')).not.toBeNull();
        }
        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        const checkboxies: HTMLInputElement[] = screen.getAllByRole('checkbox');
        await userEvent.click(checkboxies[3]);
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toVocabularyPageBtn);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        for (const card of cards) {
            expect(within(card).queryByTestId('colorOnCard')).toBeNull();
        }
    });
    test('turn on/off "new" mark on card', async () => {
        // by default on
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        expect(within(cards[0]).getByTestId('newMarkOnCard')).not.toBeNull();

        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        const checkboxies: HTMLInputElement[] = screen.getAllByRole('checkbox');
        await userEvent.click(checkboxies[4]);
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toVocabularyPageBtn);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        expect(within(cards[0]).queryByTestId('newMarkOnCard')).toBeNull();
    });
    test('turn on/off "disable translation visibility"', async () => {
        // by default off
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);

        for (const card of cards) {
            expect(within(card).getByText('Translate')).not.toBeNull();
        }
        const select = screen.getByTestId('select');
        await userEvent.click(select);
        await userEvent.click(within(screen.getByTestId('selectOptions')).getByText('Избранное'));
        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        for (const card of cards) {
            expect(within(card).getByText('Translate')).not.toBeNull();
        }
        
        const toSettingsPageBtn = screen.getByTestId('toSettingsPageBtn');
        await userEvent.click(toSettingsPageBtn);
        await screen.findByTestId('settingsPage');
        const checkboxies: HTMLInputElement[] = screen.getAllByRole('checkbox');
        await userEvent.click(checkboxies[5]);
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toVocabularyPageBtn);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        for (const card of cards) {
            expect(within(card).queryByText('Translate')).toBeNull();
        }
    });
});
