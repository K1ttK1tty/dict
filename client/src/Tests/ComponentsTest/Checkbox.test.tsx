import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { describe, expect, test } from 'vitest';

import SearchParamsMenu from '../../components/UI/InputSearch/SearchParamsMenu';

import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';

const elements = (
    <Suspense>
        <SearchParamsMenu />
    </Suspense>
);
describe('Checkbox component', () => {
    test('checked on/off', async () => {
        renderWithReduxAndRoute(elements);
        const letterCase = screen.getByText(/Учитывать регистр:/i);
        const checkbox: HTMLInputElement = within(letterCase).getByRole('checkbox');
        expect(checkbox.checked).toBe(false);
        await userEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
        await userEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
    });
});
