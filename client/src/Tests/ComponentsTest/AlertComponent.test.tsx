import { cleanup, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import Alert from '../../components/UI/Alert/Alert';
import modalStyles from '../../components/UI/Modal/ModalEditCard/Modal.module.css';
import cardStyles from '../../components/UI/WordCard/WordCard.module.css';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { dataWithCardsForStatisticsPage } from './TestsConsts';

const elements = (
    <Suspense>
        <App />
        <Alert />
    </Suspense>
);
afterEach(cleanup);

describe('Alert component', () => {
    describe('Modal dictionary', () => {
        test('Create empty dictionary', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const dictionaryButton = screen.getByText('default');
            const dictModal = screen.getByTestId('modalDictionary');
            await userEvent.click(dictionaryButton);
            let createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            const createDictInput = screen.getByTestId('createDictInput');
            createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            expect(screen.getByText('Название не должно быть пустым.'));
        });
        test('Create default dictionary', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const dictionaryButton = screen.getByText('default');
            const dictModal = screen.getByTestId('modalDictionary');
            await userEvent.click(dictionaryButton);
            let createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            const createDictInput = screen.getByTestId('createDictInput');
            fireEvent.change(createDictInput, { target: { value: 'second' } });
            createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            expect(screen.getByText('Название совпадает с уже существующим словарем.'));
        });
        test('Create already existing dictionary', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const dictionaryButton = screen.getByText('default');
            const dictModal = screen.getByTestId('modalDictionary');
            await userEvent.click(dictionaryButton);
            let createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            const createDictInput = screen.getByTestId('createDictInput');
            fireEvent.change(createDictInput, { target: { value: 'second' } });
            createButton = within(dictModal).getByText('Создать');
            await userEvent.click(createButton);
            expect(screen.getByText('Название совпадает с уже существующим словарем.'));
        });
        test('Switch dictionary to empty one', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const dictionaryButton = screen.getByText('default');
            const dictModal = screen.getByTestId('modalDictionary');
            await userEvent.click(dictionaryButton);
            let changeButton = within(dictModal).getByText('Сменить');
            await userEvent.click(changeButton);
            changeButton = within(dictModal).getByText('Сменить');
            await userEvent.click(changeButton);
            expect(screen.getByText('Нужно выбрать словарь!'));
        });
        test('Remove empty one', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const dictionaryButton = screen.getByText('default');
            const dictModal = screen.getByTestId('modalDictionary');
            await userEvent.click(dictionaryButton);
            let deleteButton = within(dictModal).getByText('Удалить');
            await userEvent.click(deleteButton);
            deleteButton = within(dictModal).getByText('Удалить');
            await userEvent.click(deleteButton);
            expect(screen.getByText('Нужно выбрать словарь!'));
        });
    });
    describe('ModalEditThemes', () => {
        test('press "change" button with not selected theme and with empty new theme', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const select = screen.getByTestId('select');
            await userEvent.click(select);
            const selectOptions = screen.getByTestId('selectOptions');
            await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
            const modal = screen.getByTestId('modalEditThemes');
            await userEvent.click(within(modal).getByText('Изменить'));
            expect(screen.getByText('Нужно выбрать старую/новую тему!'));
        });
        test('select old theme and press "change" button', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const select = screen.getByTestId('select');
            await userEvent.click(select);
            const selectOptions = screen.getByTestId('selectOptions');
            expect(within(selectOptions).getByText('theme2'));
            await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
            const modal = screen.getByTestId('modalEditThemes');
            await userEvent.click(within(modal).getByText('theme2'));
            await userEvent.click(within(modal).getByText('Изменить'));
            expect(screen.getByText('Нужно выбрать старую/новую тему!'));
        });
        test('write new theme and press "change" button', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const select = screen.getByTestId('select');
            await userEvent.click(select);
            const selectOptions = screen.getByTestId('selectOptions');
            await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
            const modal = screen.getByTestId('modalEditThemes');
            const inputForNewTheme = screen.getByTestId('inputForNewTheme');
            fireEvent.change(inputForNewTheme, { target: { value: 'newThemeInsteadOfTheme2' } });
            await userEvent.click(within(modal).getByText('Изменить'));
            expect(screen.getByText('Нужно выбрать старую/новую тему!'));
        });
        test('select old theme, write new theme and press "change" button', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const select = screen.getByTestId('select');
            await userEvent.click(select);
            const selectOptions = screen.getByTestId('selectOptions');
            await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
            const modal = screen.getByTestId('modalEditThemes');
            await userEvent.click(within(modal).getByText('theme2'));
            const inputForNewTheme = screen.getByTestId('inputForNewTheme');
            fireEvent.change(inputForNewTheme, { target: { value: 'newThemeInsteadOfTheme2' } });
            await userEvent.click(within(modal).getByText('Изменить'));
            expect(screen.queryByText('Нужно выбрать старую/новую тему!')).toBeNull();
        });
    });
    describe('Modal add card', () => {
        test('add card with empty fields', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const modalAddCard = screen.getByTestId('modalAddCards');
            const addCardButton = screen.getAllByTestId('addCardButton')[0];
            await userEvent.click(addCardButton);
            const btnAddCard = within(modalAddCard).getByText('Создать');
            await userEvent.click(btnAddCard);
            expect(screen.getByText('Поля "Слово" и "Перевод" должны быть заполнены'));
        });
        test('add card with empty translate', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const modalAddCard = screen.getByTestId('modalAddCards');
            const addCardButton = screen.getAllByTestId('addCardButton')[0];
            await userEvent.click(addCardButton);
            const btnAddCard = within(modalAddCard).getByText('Создать');
            const inputWord = screen.getByPlaceholderText('Слово');
            fireEvent.change(inputWord, { target: { value: 'newNameOfCardJustCreated' } });
            await userEvent.click(btnAddCard);
            expect(screen.getByText('Поля "Слово" и "Перевод" должны быть заполнены'));
        });
        test('add card with empty word', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const modalAddCard = screen.getByTestId('modalAddCards');
            const addCardButton = screen.getAllByTestId('addCardButton')[0];
            await userEvent.click(addCardButton);
            const btnAddCard = within(modalAddCard).getByText('Создать');
            const inputTranslate = screen.getByPlaceholderText('Перевод');
            fireEvent.change(inputTranslate, { target: { value: 'newTranslateOfCardJustCreated' } });
            await userEvent.click(btnAddCard);
            expect(screen.getByText('Поля "Слово" и "Перевод" должны быть заполнены'));
        });
        test('add card with filled fields (without alert)', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const modalAddCard = screen.getByTestId('modalAddCards');
            const addCardButton = screen.getAllByTestId('addCardButton')[0];
            await userEvent.click(addCardButton);
            const btnAddCard = within(modalAddCard).getByText('Создать');
            const inputWord = screen.getByPlaceholderText('Слово');
            const inputTranslate = screen.getByPlaceholderText('Перевод');
            fireEvent.change(inputTranslate, { target: { value: 'newTranslateOfCardJustCreated' } });
            fireEvent.change(inputWord, { target: { value: 'newNameOfCardJustCreated' } });
            await userEvent.click(btnAddCard);
            expect(screen.queryByText('Поля "Слово" и "Перевод" должны быть заполнены')).toBeNull();
        });
    });
    describe('generateQuizWords', () => {
        test('round', async () => {
            renderWithReduxAndRoute(elements, { AuthSlice: dataWithCardsForStatisticsPage });
            const background = await screen.findByTestId('vocabulary');
            const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');
            await userEvent.click(toGamesPageBtn);
            await screen.findByText(/Самопроверка/i);
            const inputEnterWordsCount = screen.getByTestId('inputEnterWordsCount');
            fireEvent.change(inputEnterWordsCount, { target: { value: 51 } });
            const generateButton = screen.getByText('Сгенерировать');
            await userEvent.click(generateButton);
            expect(screen.getByText('Давай округлим до 50))))'));
        });
    });
});
