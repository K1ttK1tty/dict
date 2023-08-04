import { cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import Alert from '../../components/UI/Alert/Alert';
import AuthStyles from '../../components/UI/Authorization/Authorization.module.css';

import App from '../../App';
import $api from '../../api';
import { renderWithReduxAndRoute } from '../Helpers/renderWithReduxAndRoute';

const activeButton = AuthStyles.buttonSwitcherActive;
const hideFormClass = AuthStyles.formHide;
afterEach(cleanup);
const elements = (
    <Suspense>
        <App />
        <Alert />
    </Suspense>
);
describe('Authorization', () => {
    test('registration', async () => {
        renderWithReduxAndRoute(elements);
        const response: any = {
            status: 200,
            data: {
                message: 'Регистрация прошла успешно',
                userData: {
                    accessToken: 'accessToken',
                    refreshToken: 'refreshToken',
                    user: {
                        id: 1,
                        name: 'name',
                        email: 'userEmail@mail.ru',
                        isActivated: 0,
                        registrationDate: '11-02-2022',
                    },
                },
            },
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockReturnValue(response);
        const registrationBtn = screen.getByTestId('switchFormToRegistration');
        await userEvent.click(registrationBtn);
        const registrateBtn = screen.getByTestId('registrationBtn');
        const registrationName = screen.getByTestId('registrationName');
        const registrationEmail = screen.getByTestId('registrationEmail');
        const registrationPassword = screen.getByTestId('registrationPassword');
        fireEvent.change(registrationName, { target: { value: '360' } });
        fireEvent.change(registrationEmail, { target: { value: 'userEmail@mail.ru' } });
        fireEvent.change(registrationPassword, { target: { value: '123123' } });
        const withoutAlert = screen.queryByText(/Регистрация прошла успешно/i);
        expect(withoutAlert).toBeNull();
        await userEvent.click(registrateBtn);
        screen.getByText(/Регистрация прошла успешно/i);
    });
    test('registration reject', async () => {
        renderWithReduxAndRoute(elements);
        const response: any = {
            status: 200,
            data: {
                message: 'Регистрация прошла успешно',
                errors: [],
            },
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockRejectedValue(response);
        const registrationBtn = screen.getByTestId('switchFormToRegistration');
        await userEvent.click(registrationBtn);
        const registrateBtn = screen.getByTestId('registrationBtn');
        const registrationName = screen.getByTestId('registrationName');
        const registrationEmail = screen.getByTestId('registrationEmail');
        const registrationPassword = screen.getByTestId('registrationPassword');
        fireEvent.change(registrationName, { target: { value: '360' } });
        fireEvent.change(registrationEmail, { target: { value: 'userEmail@mail.ru' } });
        fireEvent.change(registrationPassword, { target: { value: '123123' } });
        const withoutAlert = screen.queryByText('Произошла ошибка при запросе на сервер :(');
        expect(withoutAlert).toBeNull();
        await userEvent.click(registrateBtn);
        screen.getByText('Произошла ошибка при запросе на сервер :(');
    });
    test('Login', async () => {
        renderWithReduxAndRoute(elements);
        const response: any = {
            status: 200,
            data: {
                message: 'Вы вошли в аккаунт',
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
                user: {
                    id: 1,
                    name: 'name',
                    email: 'userEmail@mail.ru',
                    isActivated: 0,
                    registrationDate: '11-02-2022',
                },
            },
        };
        const responseWithData: any = {
            status: 200,
            data: {
                default: {
                    selectOptions: ['1theme', '2theme', '3theme'],
                    cards: [
                        {
                            id: 1,
                            word: 'word',
                            translate: 'translate',
                            theme: 'theme',
                            note: 'note',
                            time: 123,
                            color: 'red',
                            favorite: false,
                        },
                    ],
                },
            },
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockImplementation(url => {
            switch (url) {
                case '/login':
                    return response;
                case '/getUserData':
                    return responseWithData;
                default:
                    break;
            }
        });
        global.window.URL.createObjectURL = vi.fn(() => 'detail');
        const loginEmailInput = screen.getByTestId('loginEmailInput');
        const loginPasswordInput = screen.getByTestId('loginPasswordInput');
        const loginBtn = screen.getByTestId('loginBtn');
        fireEvent.change(loginEmailInput, { target: { value: 'userEmail@mail.ru' } });
        fireEvent.change(loginPasswordInput, { target: { value: '123123' } });
        const withoutAlert = screen.queryByText(/Вы вошли в аккаунт/i);
        expect(withoutAlert).toBeNull();
        await userEvent.click(loginBtn);
        screen.getByText(/Вы вошли в аккаунт/i);
        const mockAxiosWithData = vi.spyOn($api, 'post');
        mockAxiosWithData.mockReturnValueOnce(responseWithData);
        expect(mockAxios).toBeCalledTimes(2);
        await screen.findByTestId('vocabulary');
    });
    test('Login reject', async () => {
        renderWithReduxAndRoute(elements);
        const errorResponse: any = {
            data: { message: 'Пользователя не существует' },
            status: 404,
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockRejectedValue(errorResponse);
        const loginEmailInput = screen.getByTestId('loginEmailInput');
        const loginPasswordInput = screen.getByTestId('loginPasswordInput');
        const loginBtn = screen.getByTestId('loginBtn');
        fireEvent.change(loginEmailInput, { target: { value: 'admin@mail.ru' } });
        fireEvent.change(loginPasswordInput, { target: { value: '123123' } });
        const withoutAlert = screen.queryByText('Произошла ошибка при запросе на сервер :(');
        expect(withoutAlert).toBeNull();
        await userEvent.click(loginBtn);
        screen.getByText('Произошла ошибка при запросе на сервер :(');
        expect(mockAxios).toBeCalledTimes(1);
    });
    test('change password', async () => {
        renderWithReduxAndRoute(elements);
        const response: any = {
            data: { message: 'Сообщение отправлено' },
            status: 200,
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockReturnValue(response);
        const linkToChangePasswd = screen.getByText(/Забыли пароль?/i);
        await userEvent.click(linkToChangePasswd);
        screen.getByText(/Смена пароля/i);
        const sendBtn = screen.getByText(/Отправить/i);
        const input: HTMLInputElement = screen.getByTestId('inputChangePasswordPage');
        fireEvent.change(input, { target: { value: 'admin@mail.ru' } });
        const withoutAlert = screen.queryByText(/Сообщение отправлено/i);
        expect(withoutAlert).toBeNull();
        await userEvent.click(sendBtn);
        screen.getByText(/Сообщение отправлено/i);
        expect(mockAxios).toBeCalledTimes(1);
    });
    test('reject change password', async () => {
        renderWithReduxAndRoute(elements);
        const response: any = {
            data: { message: 'Сообщение отправлено' },
            status: 200,
        };
        const mockAxios = vi.spyOn($api, 'post');
        mockAxios.mockRejectedValue(response);
        const linkToChangePasswd = screen.getByText(/Забыли пароль?/i);
        await userEvent.click(linkToChangePasswd);
        screen.getByText(/Смена пароля/i);
        const sendBtn = screen.getByText(/Отправить/i);
        const input: HTMLInputElement = screen.getByTestId('inputChangePasswordPage');
        fireEvent.change(input, { target: { value: 'admin@mail.ru' } });
        const withoutAlert = screen.queryByText('Произошла ошибка при запросе на сервер :(');
        expect(withoutAlert).toBeNull();
        await userEvent.click(sendBtn);
        screen.getByText('Произошла ошибка при запросе на сервер :(');
        expect(mockAxios).toBeCalledTimes(1);
    });
});
describe('login or registration', () => {
    test('firstRender and switching between forms', async () => {
        renderWithReduxAndRoute(elements);
        const loginBtn = screen.getByTestId('switchFormToLogin');
        const registrationBtn = screen.getByTestId('switchFormToRegistration');
        const loginForm = screen.getByTestId('loginForm');
        const registrationForm = screen.getByTestId('registrationForm');
        expect(await screen.findByTestId('authorization'));
        expect(loginBtn.classList.contains(activeButton)).toBe(true);
        expect(registrationBtn.classList.contains(activeButton)).toBe(false);
        expect(loginForm.classList.contains(hideFormClass)).toBe(false);
        expect(registrationForm.classList.contains(hideFormClass)).toBe(true);
        await userEvent.click(registrationBtn);
        expect(loginBtn.classList.contains(activeButton)).toBe(false);
        expect(registrationBtn.classList.contains(activeButton)).toBe(true);
        expect(loginForm.classList.contains(hideFormClass)).toBe(true);
        expect(registrationForm.classList.contains(hideFormClass)).toBe(false);
        await userEvent.click(loginBtn);
        expect(loginBtn.classList.contains(activeButton)).toBe(true);
        expect(registrationBtn.classList.contains(activeButton)).toBe(false);
        expect(loginForm.classList.contains(hideFormClass)).toBe(false);
        expect(registrationForm.classList.contains(hideFormClass)).toBe(true);
    });
});
describe('forgotPassword', () => {
    test('switching to forgotPassword and back', async () => {
        renderWithReduxAndRoute(elements);
        const linkToChangePasswd = screen.getByText(/Забыли пароль?/i);
        await userEvent.click(linkToChangePasswd);
        screen.getByText(/Смена пароля/i);
        const backToLoginPageLink = screen.getByTestId('backToLoginPage');
        await userEvent.click(backToLoginPageLink);
        screen.getByTestId('loginForm');
    });
});
describe('authentication form handlers', () => {
    test('login', async () => {
        renderWithReduxAndRoute(elements);
        const loginBtn = screen.getByTestId('loginBtn');
        await userEvent.click(loginBtn);
        expect(screen.getAllByTestId('formError').length).toBe(2);
    });
    test('registration', async () => {
        renderWithReduxAndRoute(elements);
        const registrationBtn = screen.getByTestId('switchFormToRegistration');
        await userEvent.click(registrationBtn);
        const registrateBtn = screen.getByTestId('registrationBtn');
        await userEvent.click(registrateBtn);
        expect(screen.getAllByTestId('formError').length).toBe(3);
    });
});
