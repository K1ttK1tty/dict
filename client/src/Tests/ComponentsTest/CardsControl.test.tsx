import { cleanup, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import modalStyles from '../../components/UI/Modal/ModalEditCard/Modal.module.css';
import cardStyles from '../../components/UI/WordCard/WordCard.module.css';

import { IAuthSliceInitialState } from '../../store/storeModels';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { cards66 } from './Cards66';
import { authorizationData, dataWhereCardsWithoutRedColorAndTheme1 } from './TestsConsts';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
afterEach(cleanup);
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

    test('themes and colors selection and check cards.length', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        // select color
        let select = screen.getByTestId('select');
        await userEvent.click(select);
        let selectOptions = screen.getByTestId('selectOptions');
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        await userEvent.click(within(selectOptions).getByText('Цвета'));
        let redColor = screen.getByTestId('redColorInSelect');
        await userEvent.click(redColor);
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('red')).not.toBeNull();

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(2);
        // select theme
        select = screen.getByTestId('select');
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        let themeOption = within(selectOptions).getByText('theme1');
        await userEvent.click(themeOption);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(1);
        // select another theme
        select = screen.getByTestId('select');
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        themeOption = within(selectOptions).getByText('theme2');
        await userEvent.click(themeOption);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        // select another color
        select = screen.getByTestId('select');
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(within(selectOptions).getByText('Цвета'));
        redColor = screen.getByTestId('greenColorInSelect');
        await userEvent.click(redColor);
        expect(within(select).queryByText('theme2')).toBeNull();
        expect(within(select).getByText('green')).not.toBeNull();

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(2);
        // select favorite
        select = screen.getByTestId('select');
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(within(screen.getByTestId('selectOptions')).getByText('Избранное'));
        expect(within(select).queryByText('green')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();
        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
    });

    test('"modal add card" without selected(default) theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        await screen.findByTestId('vocabulary');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[1];
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);
        const inputWTheme = screen.getByPlaceholderText('Тема');
        expect(inputWTheme.innerHTML).toEqual('');
    });
    test('"modal add card" with selected color', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[0];
        const select = screen.getByTestId('select');
        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        await userEvent.click(within(selectOptions).getByText('Цвета'));
        const redColor = screen.getByTestId('redColorInSelect');
        await userEvent.click(redColor);
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('red')).not.toBeNull();
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);
        const inputWithTheme: HTMLInputElement = within(modalAddCard).getByPlaceholderText('Тема');
        expect(inputWithTheme.value).toEqual('');
    });
    test('"modal add card" add new card with selected(default) theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[0];
        const select = screen.getByTestId('select');
        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        const themeOption = within(selectOptions).getByText('theme1');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);
        await userEvent.click(themeOption);
        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(1);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);
        expect(within(select).getByText('theme1')).not.toBeNull();
        const inputWithTheme: HTMLInputElement = within(modalAddCard).getByPlaceholderText('Тема');
        expect(inputWithTheme.value).toEqual('theme1');
        const inputWord = screen.getByPlaceholderText('Слово');
        const inputTranslate = screen.getByPlaceholderText('Перевод');
        const inputWTheme: HTMLInputElement = screen.getByPlaceholderText('Тема');
        const inputNote = screen.getByPlaceholderText('Комментарий...');
        const favoriteCheckbox: HTMLInputElement = within(modalAddCard).getByRole('checkbox');
        const btnAddCard = within(modalAddCard).getByText('Создать');
        fireEvent.change(inputWord, { target: { value: 'newNameOfCardJustCreated' } });
        fireEvent.change(inputTranslate, { target: { value: 'newTranslateOfCardJustCreated' } });
        fireEvent.change(inputNote, { target: { value: 'newNoteOfCardJustCreated' } });
        expect(inputWTheme.value).toEqual('theme1');
        await userEvent.click(favoriteCheckbox);
        expect(favoriteCheckbox.checked).toBe(true);
        await userEvent.click(btnAddCard);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        expect(screen.queryByText('Поля "Слово" и "Перевод" должны быть заполнены')).toBeNull();
        cards = screen.getAllByTestId('cards');

        expect(cards.length).toBe(2);
        expect(within(cards[0]).getByText('newNameOfCardJustCreated')).not.toBeNull();
        expect(within(cards[0]).getByText('newTranslateOfCardJustCreated')).not.toBeNull();
        const favoriteIcons = within(cards[0]).getByTestId('favoriteIcon');
        expect(favoriteIcons.classList[0]).toEqual('favoriteIcon');
        expect(favoriteIcons.classList[1]).toEqual('fill'); // with fill - favorite
        const newMarks = within(cards[0]).getByTestId('newMarkOnCard');
        expect(newMarks).not.toBeNull();
        const colorOnCards = within(cards[0]).getByTestId('colorOnCard');
        expect(colorOnCards.className).toEqual(cardStyles.colorMark + ' ' + cardStyles.red);
    });
    test('add new card without selected(default) theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        const modalAddCard = screen.getByTestId('modalAddCards');
        const addCardButton = screen.getAllByTestId('addCardButton')[0];
        expect(cards.length).toBe(6);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(addCardButton);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(true);
        const inputWord = screen.getByPlaceholderText('Слово');
        const inputTranslate = screen.getByPlaceholderText('Перевод');
        const inputWTheme = screen.getByPlaceholderText('Тема');
        const inputNote = screen.getByPlaceholderText('Комментарий...');
        const btnAddCard = within(modalAddCard).getByText('Создать');
        fireEvent.change(inputWord, { target: { value: 'newNameOfCardJustCreated' } });
        fireEvent.change(inputTranslate, { target: { value: 'newTranslateOfCardJustCreated' } });
        fireEvent.change(inputWTheme, { target: { value: 'newThemeOfCardJustCreated' } });
        fireEvent.change(inputNote, { target: { value: 'newNoteOfCardJustCreated' } });
        await userEvent.click(btnAddCard);
        expect(modalAddCard.classList.contains(modalStyles.active)).toBe(false);
        expect(screen.queryByText('Поля "Слово" и "Перевод" должны быть заполнены')).toBeNull();

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(7);
        expect(within(cards[0]).getByText('newNameOfCardJustCreated')).not.toBeNull();
        expect(within(cards[0]).getByText('newTranslateOfCardJustCreated')).not.toBeNull();
        const favoriteIcons = within(cards[0]).getByTestId('favoriteIcon');
        expect(favoriteIcons.classList[0]).toEqual('favoriteIcon');
        expect(favoriteIcons.classList[1]).toEqual(undefined); // without fill - not favorite
        const newMarks = within(cards[0]).getByTestId('newMarkOnCard');
        expect(newMarks).not.toBeNull();
        const colorOnCards = within(cards[0]).getByTestId('colorOnCard');
        expect(colorOnCards.className).toEqual(cardStyles.colorMark + ' ' + cardStyles.red);
    });
    test('check remove theme buttons and deleting one empty theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWhereCardsWithoutRedColorAndTheme1 });
        const background = await screen.findByTestId('vocabulary');
        const cards = screen.getAllByTestId('cards');
        expect(cards.length).toBeGreaterThan(0);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        const select = screen.getByTestId('select');
        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        let themeOption1: any = within(selectOptions).getByText('theme1');
        await userEvent.click(themeOption1);
        expect(screen.queryAllByTestId('cards').length).toBe(0);

        const removeThisThemeButton = screen.queryByText('Удалить эту тему');
        expect(removeThisThemeButton).not.toBeNull();
        expect(screen.queryByText('Удалить все пустые темы')).not.toBeNull();

        expect(removeThisThemeButton).not.toBeNull();
        if (removeThisThemeButton) await userEvent.click(removeThisThemeButton);
        expect(within(select).getByText('Тема'));

        await userEvent.click(select);

        themeOption1 = within(selectOptions).queryByText('theme1');
        const themeOption2 = within(selectOptions).getByText('theme3');
        expect(themeOption2).not.toBeNull();
        expect(themeOption1).toBeNull();
    });
    test('check remove theme buttons and deleting all empty themes', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWhereCardsWithoutRedColorAndTheme1 });
        const background = await screen.findByTestId('vocabulary');
        const cards = screen.getAllByTestId('cards');
        expect(cards.length).toBeGreaterThan(0);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        const select = screen.getByTestId('select');
        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        const themeOption1: any = within(selectOptions).getByText('theme1');
        await userEvent.click(themeOption1);
        expect(screen.queryAllByTestId('cards').length).toBe(0);
        const removeThisThemeButton = screen.queryByText('Удалить эту тему');
        const removeAllThemesButton: any = screen.queryByText('Удалить все пустые темы');
        expect(removeThisThemeButton).not.toBeNull();
        expect(removeAllThemesButton).not.toBeNull();
        await userEvent.click(removeAllThemesButton);
        expect(screen.queryByText('Удалить эту тему')).toBeNull();
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(within(select).getByText('Тема'));
        await userEvent.click(select);
        expect(within(selectOptions).queryByText('theme1')).toBeNull();
        expect(within(selectOptions).queryByText('theme3')).toBeNull();
    });
    test('check removeButtons if color or newMark or favorive selected', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWhereCardsWithoutRedColorAndTheme1 });
        const background = await screen.findByTestId('vocabulary');
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        const select = screen.getByTestId('select');
        await userEvent.click(select);
        const redColor = screen.getByTestId('redColorInSelect');
        await userEvent.click(redColor);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        await userEvent.click(select);
        const orangeColor = screen.getByTestId('orangeColorInSelect');
        await userEvent.click(orangeColor);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        await userEvent.click(select);
        const greenColor = screen.getByTestId('greenColorInSelect');
        await userEvent.click(greenColor);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();

        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        const favorite = within(selectOptions).getByText('Избранное');
        await userEvent.click(favorite);
        expect(screen.queryByText('Удалить все пустые темы')).toBeNull();
        expect(screen.queryByText('Удалить эту тему')).toBeNull();
    });
    test('create and change dictionaies', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: dataWhereCardsWithoutRedColorAndTheme1 });
        const background = await screen.findByTestId('vocabulary');

        let dictionaryButton = screen.getByText('default');

        const dictModal = screen.getByTestId('modalDictionary');
        expect(dictModal.classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(dictionaryButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(true);

        expect(within(dictModal).getByText('Текущий словарь: default'));
        expect(within(dictModal).getByText('Это стандартный словарь, его нельзя удалить'));

        let changeButton = within(dictModal).getByText('Сменить');
        await userEvent.click(changeButton);
        expect(screen.getByText('Смена словаря'));
        expect(screen.getByText('Тут ничего нет...'));
        await userEvent.click(screen.getByTestId('backArrowDictModal'));
        expect(within(dictModal).getByText('Текущий словарь: default'));
        expect(within(dictModal).getByText('Это стандартный словарь, его нельзя удалить'));

        let createButton = within(dictModal).getByText('Создать');
        await userEvent.click(createButton);
        expect(screen.getByText('Создание словаря'));
        await userEvent.click(screen.getByTestId('backArrowDictModal'));
        expect(within(dictModal).getByText('Текущий словарь: default'));
        expect(within(dictModal).getByText('Это стандартный словарь, его нельзя удалить'));

        let deleteButton = within(dictModal).getByText('Удалить');
        await userEvent.click(deleteButton);
        expect(screen.getByText('Удаление словаря'));
        expect(screen.getByText('Тут ничего нет...'));
        await userEvent.click(screen.getByTestId('backArrowDictModal'));
        expect(within(dictModal).getByText('Текущий словарь: default'));
        expect(within(dictModal).getByText('Это стандартный словарь, его нельзя удалить'));

        createButton = within(dictModal).getByText('Создать');
        await userEvent.click(createButton);
        expect(screen.getByText('Создание словаря'));

        const createDictInput = screen.getByTestId('createDictInput');
        fireEvent.change(createDictInput, { target: { value: 'notDefault' } });
        createButton = within(dictModal).getByText('Создать');
        await userEvent.click(createButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(false);
        let notDefault = screen.getByText('notDefault');
        await userEvent.click(notDefault);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(true);
        expect(within(dictModal).getByText('Текущий словарь: notDefault'));
        expect(within(dictModal).queryByText('Это стандартный словарь, его нельзя удалить')).toBeNull();

        // check and switch to default dictionary in list
        changeButton = within(dictModal).getByText('Сменить');
        await userEvent.click(changeButton);

        expect(within(dictModal).getByText('default'));
        expect(within(dictModal).queryByText('notDefault')).toBeNull();
        await userEvent.click(within(dictModal).getByText('default'));
        changeButton = within(dictModal).getByText('Сменить');
        await userEvent.click(changeButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(false);
        dictionaryButton = screen.getByText('default');
        await userEvent.click(dictionaryButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(true);
        expect(within(dictModal).getByText('Текущий словарь: default'));
        expect(within(dictModal).getByText('Это стандартный словарь, его нельзя удалить'));

        // switch to notDefault
        changeButton = within(dictModal).getByText('Сменить');
        await userEvent.click(changeButton);
        await userEvent.click(within(dictModal).getByText('notDefault'));
        changeButton = within(dictModal).getByText('Сменить');
        await userEvent.click(changeButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(false);

        notDefault = screen.getByText('notDefault');
        await userEvent.click(notDefault);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(true);
        expect(within(dictModal).getByText('Текущий словарь: notDefault'));
        expect(within(dictModal).queryByText('Это стандартный словарь, его нельзя удалить')).toBeNull();

        // removing at the end
        deleteButton = within(dictModal).getByText('Удалить');
        await userEvent.click(deleteButton);
        expect(screen.getByText('Удаление словаря'));
        expect(screen.queryByText('default')).toBeNull();
        expect(within(dictModal).getByText('notDefault'));

        deleteButton = within(dictModal).getByText('Удалить');
        await userEvent.click(deleteButton);
        expect(dictModal.classList.contains(modalStyles.active)).toBe(true);

        expect(screen.getByText('Тут ничего нет...'));
        expect(screen.getByText('Удаление словаря'));
        expect(screen.queryByText('default')).toBeNull();
        // expect(within(dictModal).queryByText('notDefault')).toBeNull(); //+-
    });
});
