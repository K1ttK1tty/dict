import { cleanup, fireEvent, getAllByTestId, getByTestId, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import modalStyles from '../../components/UI/Modal/ModalEditCard/Modal.module.css';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { authorizationData, authorizationDataWithActivation } from './TestsConsts';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
describe('CardsControl component', () => {
    test('attach/move position', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        expect(screen.getByTestId('attachedCardsControl')).not.toBeNull();
        expect(screen.queryByTestId('notAttachedCardsControl')).toBeNull();
        await userEvent.click(screen.getByTestId('pinIcon'));
        expect(screen.queryByTestId('attachedCardsControl')).toBeNull();
        expect(screen.getByTestId('notAttachedCardsControl')).not.toBeNull();
        await userEvent.click(screen.getByTestId('pinIcon'));
        expect(screen.getByTestId('attachedCardsControl')).not.toBeNull();
        expect(screen.queryByTestId('notAttachedCardsControl')).toBeNull();
    });

    test('modal add card without default theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[0];
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);

        const inputWTheme = screen.getByPlaceholderText('Тема');
        expect(inputWTheme.innerHTML).toEqual('');
    });
    test.only('modal add card without default theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[0];
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);

        const select = screen.getByTestId('select');
        

        const inputWTheme = screen.getByPlaceholderText('Тема');
        expect(inputWTheme.innerHTML).toEqual('');
    });
    // test.only('add new card', async () => {
    //     renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
    //     await screen.findByTestId('vocabulary');
    //     const cards = screen.getAllByTestId('cards');
    //     const modalAddCard = screen.getByTestId('modalAddCards');
    //     const addCardButton = screen.getAllByTestId('addCardButton')[0];
    //     expect(cards.length).toBe(6);
    //     expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
    //     await userEvent.click(addCardButton);
    //     expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);
    //     const inputWord = screen.getByPlaceholderText('Слово');
    //     const inputTranslate = screen.getByPlaceholderText('Перевод');
    //     const inputWTheme = screen.getByPlaceholderText('Тема');
    //     const inputNote = screen.getByPlaceholderText('Комментарий...');
    //     const favoriteCheckbox = within(modalAddCard).getByRole('checkbox');
    //     const btnAddCard = within(modalAddCard).getByText('Создать');
    //     fireEvent.change(inputWord, { target: { value: 'newName' } });
    //     fireEvent.change(inputTranslate, { target: { value: 'newTranslate' } });
    //     fireEvent.change(inputWTheme, { target: { value: 'newTheme' } });
    //     fireEvent.change(inputNote, { target: { value: 'newNote' } });
    //     await userEvent.click(favoriteCheckbox);
    //     await userEvent.click(btnAddCard);
    // });
});
