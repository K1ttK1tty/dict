import { cleanup, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import { IAuthSliceInitialState } from '../../store/storeModels';

import App from '../../App';
import { cardsWithOneColorAndFavorite } from '../ComponentsTest/Cards66';
import { authorizationData } from '../ComponentsTest/TestsConsts';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
const data: IAuthSliceInitialState = { ...authorizationData, cards: cardsWithOneColorAndFavorite };
afterEach(cleanup);
describe('Games Page', () => {
    test('generate and switch page', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        expect(screen.queryByText('Проверить')).toBeNull();
        expect(screen.queryByText('Еще попытка')).toBeNull();
        const generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);

        const cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);

        await userEvent.click(toVocabularyPageBtn);
        await screen.findByTestId('vocabulary');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
    });
    test('generate in all ways', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        expect(screen.queryByText('Проверить')).toBeNull();
        expect(screen.queryByText('Еще попытка')).toBeNull();
        let generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);

        let cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getByText('Проверить')).not.toBeNull();
        expect(screen.getByText('Еще попытка')).not.toBeNull();

        const input = screen.getAllByRole('checkbox');
        await userEvent.click(input[1]); // word/translate
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        expect(screen.queryByText('Проверить')).toBeNull();
        expect(screen.queryByText('Еще попытка')).toBeNull();

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);

        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getByText('Проверить')).not.toBeNull();
        expect(screen.getByText('Еще попытка')).not.toBeNull();

        await userEvent.click(input[2]); // favorite
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        expect(screen.queryByText('Проверить')).toBeNull();
        expect(screen.queryByText('Еще попытка')).toBeNull();

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);

        const changeColorButton = screen.getByTestId('changeColor');
        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        expect(screen.queryByText('Проверить')).toBeNull();
        expect(screen.queryByText('Еще попытка')).toBeNull();

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getByText('Проверить')).not.toBeNull();
        expect(screen.getByText('Еще попытка')).not.toBeNull();
    });
    test('generate different number of cards', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        const inputEnterWordsCount = screen.getByTestId('inputEnterWordsCount');
        fireEvent.change(inputEnterWordsCount, { target: { value: '10' } });

        let generateButton = screen.getByText('Сгенерировать');
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        await userEvent.click(generateButton);
        let cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(10);

        fireEvent.change(inputEnterWordsCount, { target: { value: '2' } });
        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(2);

        fireEvent.change(inputEnterWordsCount, { target: { value: '0' } });
        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);

        fireEvent.change(inputEnterWordsCount, { target: { value: '123' } });
        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        await userEvent.click(generateButton);

        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(50);
    });
    test('generation with "word"', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: data });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        let generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);

        let cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);

        const input = screen.getAllByRole('checkbox');
        await userEvent.click(input[2]); // favorite
        expect(screen.queryAllByText(/Слово:/i)).toEqual([]);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);

        const changeColorButton = screen.getByTestId('changeColor');
        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        expect(screen.queryAllByText(/Слово:/i)).toEqual([]);

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
    });
    test('generate with "translate"', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: data });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        let generateButton = screen.getByText('Сгенерировать');

        const input = screen.getAllByRole('checkbox');
        await userEvent.click(input[1]);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        await userEvent.click(generateButton);

        let cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Перевод:/i).length).toBe(5);

        await userEvent.click(input[2]); // favorite
        expect(screen.queryAllByText(/Перевод:/i)).toEqual([]);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Перевод:/i).length).toBe(5);

        const changeColorButton = screen.getByTestId('changeColor');
        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        expect(screen.queryAllByText(/Перевод:/i)).toEqual([]);

        generateButton = screen.getByText('Сгенерировать');
        await userEvent.click(generateButton);
        cardRand = screen.getAllByTestId('cardRand');
        expect(cardRand.length).toBe(5);
        expect(screen.getAllByText(/Перевод:/i).length).toBe(5);
    });
    test('check favorite cards', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: data });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        const generateButton = screen.getByText('Сгенерировать');

        const input = screen.getAllByRole('checkbox');
        await userEvent.click(input[2]); // favorite
        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word1/i).length).toBe(5);

        const changeColorButton = screen.getByTestId('changeColor');
        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word1/i).length).toBe(5);

        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word1/i).length).toBe(5);

        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word1/i).length).toBe(5);
    });
    test('check cards with color', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: data });
        const background = await screen.findByTestId('vocabulary');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);

        expect(screen.queryAllByTestId('cardRand')).toEqual([]);

        const generateButton = screen.getByText('Сгенерировать');
        const input = screen.getAllByRole('checkbox');
        const changeColorButton = screen.getByTestId('changeColor');
        await userEvent.click(changeColorButton);

        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word1/i).length).toBe(5);

        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word3/i).length).toBe(5);

        await userEvent.click(changeColorButton);
        expect(screen.queryAllByTestId('cardRand')).toEqual([]);
        await userEvent.click(generateButton);
        expect(screen.getAllByText(/Слово:/i).length).toBe(5);
        expect(screen.getAllByText(/word5/i).length).toBe(5);
    });
});
