import { cleanup, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test } from 'vitest';

import styles from '../../components/UI/DropDownMenu/DropDownMenu.module.css';
import modalStyles from '../../components/UI/Modal/ModalEditCard/Modal.module.css';

import App from '../../App';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';
import { authorizationData } from './TestsConsts';

const elements = (
    <Suspense>
        <App />
    </Suspense>
);
afterEach(cleanup);
describe('Select component', () => {
    test('open/close handling', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');

        const select = screen.getByTestId('select');
        expect(screen.queryByTestId('selectOptions')).toBeNull();
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(select);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(background);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
    });
    test('theme selection, check removeThemeButton behavior, switching between pages', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        let background = await screen.findByTestId('vocabulary');

        let select = screen.getByTestId('select'); // open select and select theme
        await userEvent.click(select);
        let selectOptions = screen.getByTestId('selectOptions');
        let theme1Option = within(selectOptions).getByText('theme1');
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).getByText('theme1')).not.toBeNull();

        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');

        await userEvent.click(select); // open select
        selectOptions = screen.getByTestId('selectOptions');

        await userEvent.click(toGamesPageBtn); // switching between pages while select is open
        await screen.findByText(/Самопроверка/i);
        await userEvent.click(toVocabularyPageBtn);
        await screen.findByTestId('vocabulary');
        expect(within(screen.getByTestId('select')).getByText('theme1')).not.toBeNull();

        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull(); // select must be closed
        expect(screen.queryByTestId('selectOptions')).toBeNull(); // theme must be selected
        await userEvent.click(screen.getByTestId('selectRemoveThemeBtn'));
        expect(screen.queryByTestId('selectOptions')).toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(screen.getByTestId('select')).queryByText('theme1')).toBeNull();
        expect(within(screen.getByTestId('select')).getByText('Тема')).not.toBeNull();

        select = screen.getByTestId('select'); // select theme again
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        theme1Option = within(selectOptions).getByText('theme1');
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).getByText('theme1')).not.toBeNull();

        await userEvent.click(select); // check switching between themes
        selectOptions = screen.getByTestId('selectOptions');
        theme1Option = within(selectOptions).getByText('theme2');
        expect(within(select).queryByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();

        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).getByText('theme2')).not.toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();

        await userEvent.click(screen.getByTestId('selectRemoveThemeBtn'));
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(select).queryByText('theme2')).toBeNull();
        expect(within(select).getByText('Тема')).not.toBeNull();

        select = screen.getByTestId('select'); // open select again and select theme
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        theme1Option = within(selectOptions).getByText('theme1');
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();

        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        background = await screen.findByTestId('vocabulary');
        await userEvent.click(background);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        await userEvent.click(select); // press removeThemeButton while select is open
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(screen.getByTestId('selectRemoveThemeBtn'));
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(within(select).queryByText('theme1')).toBeNull();
        expect(within(select).getByText('Тема')).not.toBeNull();
    });
    test('color selection, switching between themes,colors', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');

        const select = screen.getByTestId('select');
        expect(screen.queryByTestId('selectOptions')).toBeNull();
        // red color selection
        await userEvent.click(select);
        let selectOptions = screen.getByTestId('selectOptions');
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(selectOptions).getByTestId('DropDownMenu').classList.contains(styles.hidden)).toBe(true);
        await userEvent.click(within(selectOptions).getByText('Цвета'));
        const DropDownMenu = within(selectOptions).getByTestId('DropDownMenu');
        expect(DropDownMenu.classList.contains(styles.hidden)).toBe(false);

        const redColor = screen.getByTestId('redColorInSelect');
        const orangeColor = screen.getByTestId('orangeColorInSelect');
        const greenColor = screen.getByTestId('greenColorInSelect');
        const newMark = screen.getByTestId('newMarkInSelect');
        await userEvent.click(redColor);
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('red')).not.toBeNull();

        // orange color selection
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(orangeColor);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).getByText('orange')).not.toBeNull();

        // green color selection
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(greenColor);

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).queryByText('orange')).toBeNull();
        expect(within(select).getByText('green')).not.toBeNull();

        // new mark selection
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(newMark);

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).queryByText('orange')).toBeNull();
        expect(within(select).queryByText('green')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        // theme selection

        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        const theme1Option = within(selectOptions).getByText('theme1');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).queryByText('orange')).toBeNull();
        expect(within(select).queryByText('green')).toBeNull();
        expect(within(select).queryByText('new')).toBeNull();

        // again select new mark
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(newMark);

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).queryByText('orange')).toBeNull();
        expect(within(select).queryByText('green')).toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        // switching between pages
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');

        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);
        await userEvent.click(toVocabularyPageBtn);
        await screen.findByTestId('vocabulary');

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('red')).toBeNull();
        expect(within(select).queryByText('orange')).toBeNull();
        expect(within(select).queryByText('green')).toBeNull();
        expect(within(select).queryByText('theme1')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();
    });
    test('favorive selection, switching between theme,colors and favorite', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');

        let select = screen.getByTestId('select');
        expect(screen.queryByTestId('selectOptions')).toBeNull();
        let cards = screen.getAllByTestId('cards');
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(cards.length).toBe(6);
        await userEvent.click(within(screen.getByTestId('selectOptions')).getByText('Избранное'));
        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();

        // new mark selection
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        await userEvent.click(screen.getByTestId('newMarkInSelect'));

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('Избранное')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(1);

        // theme selection
        await userEvent.click(select);
        const theme1Option = within(screen.getByTestId('selectOptions')).getByText('theme1');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).queryByText('Избранное')).toBeNull();

        // favorite selection
        select = screen.getByTestId('select');
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(within(screen.getByTestId('selectOptions')).getByText('Избранное'));

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();

        // switching between pages
        const toVocabularyPageBtn = screen.getByTestId('toVocabularyPageBtn');
        const toGamesPageBtn = screen.getByTestId('toGamesPageBtn');

        await userEvent.click(toGamesPageBtn);
        await screen.findByText(/Самопроверка/i);
        await userEvent.click(toVocabularyPageBtn);
        await screen.findByTestId('vocabulary');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();
    });
    test('open/ close modal edit theme', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        const select = screen.getByTestId('select');

        await userEvent.click(select);
        const selectOptions = screen.getByTestId('selectOptions');
        expect(selectOptions).not.toBeNull();
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(true);
        expect(selectOptions?.className).toEqual('stateOption-exit stateOption-exit-active');

        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        expect(within(select).getByText('Тема')).not.toBeNull();

        await userEvent.click(within(screen.getByTestId('modalEditThemes')).getByTestId('modalCloseButton'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
    });
    test('open modal edit theme with choosen theme/color/favorite', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');

        const select = screen.getByTestId('select');
        expect(screen.queryByTestId('selectOptions')).toBeNull();
        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        expect(screen.queryByTestId('selectRemoveThemeBtn')).toBeNull();
        await userEvent.click(within(screen.getByTestId('selectOptions')).getByText('Избранное'));

        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();
        expect(screen.getByTestId('selectOptions').className).toEqual('stateOption-exit stateOption-exit-active');

        // open modal edit theme and check selected favorite
        await userEvent.click(select);
        let selectOptions = screen.getByTestId('selectOptions');
        expect(selectOptions).not.toBeNull();
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(true);
        expect(selectOptions?.className).toEqual('stateOption-exit stateOption-exit-active');

        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();

        await userEvent.click(within(screen.getByTestId('modalEditThemes')).getByTestId('modalCloseButton'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('Избранное')).not.toBeNull();

        // new bark selection

        await userEvent.click(select);
        expect(screen.getByTestId('selectOptions')).not.toBeNull();
        const newMark = screen.getByTestId('newMarkInSelect');
        await userEvent.click(newMark);

        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        // again open modal edit theme and check selected color

        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        expect(selectOptions).not.toBeNull();
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(true);
        expect(selectOptions?.className).toEqual('stateOption-exit stateOption-exit-active');

        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        await userEvent.click(within(screen.getByTestId('modalEditThemes')).getByTestId('modalCloseButton'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
        expect(within(select).getByText('new')).not.toBeNull();

        // theme selection

        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        const theme1Option = within(selectOptions).getByText('theme1');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        await userEvent.click(theme1Option);
        expect(screen.queryByTestId('selectOptions')?.className).toEqual('stateOption-exit stateOption-exit-active');
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();

        // again open modal edit theme and check selected theme
        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        expect(selectOptions).not.toBeNull();
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(true);
        expect(selectOptions?.className).toEqual('stateOption-exit stateOption-exit-active');

        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();

        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();

        await userEvent.click(within(screen.getByTestId('modalEditThemes')).getByTestId('modalCloseButton'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        expect(screen.getByTestId('selectRemoveThemeBtn')).not.toBeNull();
        expect(within(select).getByText('theme1')).not.toBeNull();
        expect(within(select).queryByText('Тема')).toBeNull();
    });
    test('theme changing modal.', async () => {
        renderWithReduxAndRoute(elements, { AuthSlice: authorizationData });
        const background = await screen.findByTestId('vocabulary');
        let cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);

        const select = screen.getByTestId('select');
        await userEvent.click(select);
        let selectOptions = screen.getByTestId('selectOptions');
        const theme2Option = within(selectOptions).getByText('theme2');
        await userEvent.click(theme2Option);
        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        expect(within(cards[0]).getByText('Word2'));
        expect(within(cards[1]).getByText('word3'));
        expect(within(cards[2]).getByText('Word4'));

        await userEvent.click(select);
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);
        await userEvent.click(within(selectOptions).getByText('Редактирование Тем'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(true);

        const modal = screen.getByTestId('modalEditThemes');
        await userEvent.click(within(modal).getByText('theme2'));
        const inputForNewTheme = screen.getByTestId('inputForNewTheme');

        fireEvent.change(inputForNewTheme, { target: { value: 'newThemeInsteadOfTheme2' } });
        await userEvent.click(within(modal).getByText('Изменить'));
        expect(screen.getByTestId('modalEditThemes').classList.contains(modalStyles.active)).toBe(false);

        await userEvent.click(screen.getByTestId('selectRemoveThemeBtn'));

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(6);

        await userEvent.click(select);
        selectOptions = screen.getByTestId('selectOptions');
        const newTheme = within(selectOptions).getByText('newThemeInsteadOfTheme2');
        await userEvent.click(newTheme);

        cards = screen.getAllByTestId('cards');
        expect(cards.length).toBe(3);
        expect(within(cards[0]).getByText('Word2'));
        expect(within(cards[1]).getByText('word3'));
        expect(within(cards[2]).getByText('Word4'));
    });
});
