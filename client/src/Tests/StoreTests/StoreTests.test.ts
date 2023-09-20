import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, test } from 'vitest';

import AuthSlice, {
    changeDictionary,
    setAvatar,
    setCards,
    setChangeCard,
    setCurrentDictionary,
    setData,
    setID,
    setSelectOptions,
    setSelectedTheme,
    setServerMessage,
} from '../../store/reducers/authorization/Authorization/AuthSlice';
import { ICard, IDataStructure, IUser } from '../../store/storeModels';

import { authorizationData } from '../ComponentsTest/TestsConsts';
import {
    getAuthInAuthSlice,
    getAvatar,
    getCards,
    getChangeCard,
    getCurrentDictionary,
    getIsLoading,
    getSelectOptions,
    getSelectedTheme,
    getServerMessage,
    getUpdateError,
    getUserAuthSlice,
    getUserData,
} from './Selectors';

const mockUser: IUser = {
    id: 3,
    name: 'naname',
    email: 'email.@mail.ru',
    isActivated: true,
    registrationDate: '15-11-2037',
};
const undefinedValue: any = undefined;
const defaultUser: IUser = {
    id: 0,
    name: 'name',
    email: 'email',
    isActivated: false,
    registrationDate: '12-7-2023',
};
const optionsArray: string[] = ['theme1', 'theme2'];
const userData: IDataStructure = {
    default: {
        selectOptions: optionsArray,
        cards: [
            {
                id: 1,
                word: 'word1',
                translate: 'translate',
                theme: 'theme1',
                note: 'note',
                time: 123,
                color: 'red',
                favorite: true,
            },
        ],
    },
};
const defaultUserData = {
    default: {
        selectOptions: [],
        cards: [],
    },
};
const cardsWithWrongOrder: ICard[] = [
    {
        id: 5,
        word: 'word5',
        translate: 'translate5',
        theme: 'theme5',
        note: 'note5',
        time: 123,
        color: 'red',
        favorite: true,
    },
    {
        id: 2,
        word: 'word2',
        translate: 'translate2',
        theme: 'theme2',
        note: 'note2',
        time: 1235,
        color: 'red',
        favorite: true,
    },
    {
        id: 11,
        word: 'word11',
        translate: 'translate11',
        theme: 'theme11',
        note: 'note11',
        time: 123,
        color: 'red',
        favorite: true,
    },
];
const cardsWithRightOrder: ICard[] = [
    {
        id: 1,
        word: 'word5',
        translate: 'translate5',
        theme: 'theme5',
        note: 'note5',
        time: 123,
        color: 'red',
        favorite: true,
    },
    {
        id: 2,
        word: 'word2',
        translate: 'translate2',
        theme: 'theme2',
        note: 'note2',
        time: 1235,
        color: 'red',
        favorite: true,
    },
    {
        id: 3,
        word: 'word11',
        translate: 'translate11',
        theme: 'theme11',
        note: 'note11',
        time: 123,
        color: 'red',
        favorite: true,
    },
];
const dataAfterAssignment: IDataStructure = {
    default: {
        selectOptions: optionsArray,
        cards: [
            {
                id: 1,
                word: 'word1',
                translate: 'translate',
                theme: 'theme1',
                note: 'note',
                time: 123,
                color: 'red',
                favorite: true,
            },
        ],
    },
    anotherDictionary: {
        selectOptions: ['1', '2'],
        cards: cardsWithRightOrder,
    },
};
const oneCard: ICard = {
    id: 1,
    word: 'word1',
    translate: 'translate',
    theme: 'theme1',
    note: 'note',
    time: 123,
    color: 'red',
    favorite: true,
};
const fakeCards: ICard[] = [
    oneCard,
    {
        id: 2,
        word: 'word1',
        translate: 'translate',
        theme: 'theme1',
        note: 'note',
        time: 123,
        color: 'red',
        favorite: true,
    },
];
afterEach(cleanup);
describe('Selector testing', () => {
    test('user from AuthSlice', () => {
        expect(getUserAuthSlice({ AuthSlice: { user: mockUser } })).toEqual(mockUser);
        expectTypeOf(getUserAuthSlice({ AuthSlice: { user: mockUser } })).toMatchTypeOf<IUser>();
        expect(getUserAuthSlice(undefinedValue)).toEqual(defaultUser);
        expectTypeOf(getUserAuthSlice(undefinedValue)).toMatchTypeOf<IUser>();
    });
    test('userData from AuthSlice', () => {
        expect(getUserData({ AuthSlice: { data: undefinedValue } })).toEqual(defaultUserData);
        expectTypeOf(getUserData({ AuthSlice: { data: undefinedValue } })).toMatchTypeOf<IDataStructure>();
        expect(getUserData({ AuthSlice: { data: userData } })).toEqual(userData);
        expectTypeOf(getUserData({ AuthSlice: { data: userData } })).toMatchTypeOf<IDataStructure>();
    });
    test('currentDictionary from AuthSlice', () => {
        expect(getCurrentDictionary({ AuthSlice: { currentDictionary: undefinedValue } })).toEqual('default');
        expectTypeOf(
            getCurrentDictionary({ AuthSlice: { currentDictionary: undefinedValue } }),
        ).toMatchTypeOf<string>();
        expect(getCurrentDictionary({ AuthSlice: { currentDictionary: 'dictionary' } })).toEqual('dictionary');
        expectTypeOf(getCurrentDictionary({ AuthSlice: { currentDictionary: 'dictionary' } })).toMatchTypeOf<string>();
    });
    test('avatar from AuthSlice', () => {
        expect(getAvatar({ AuthSlice: { avatar: undefinedValue } })).toEqual('');
        expectTypeOf(getAvatar({ AuthSlice: { avatar: undefinedValue } })).toMatchTypeOf<string>();
        expect(getAvatar({ AuthSlice: { avatar: 'someBlob' } })).toEqual('someBlob');
        expectTypeOf(getAvatar({ AuthSlice: { avatar: 'someBlob' } })).toMatchTypeOf<string>();
    });
    test('getAuthInAuthSlice from AuthSlice', () => {
        expect(getAuthInAuthSlice({ AuthSlice: { isAuth: undefinedValue } })).toBe(false);
        expectTypeOf(getAuthInAuthSlice({ AuthSlice: { isAuth: undefinedValue } })).toMatchTypeOf<boolean>();
        expect(getAuthInAuthSlice({ AuthSlice: { isAuth: true } })).toEqual(true);
        expectTypeOf(getAuthInAuthSlice({ AuthSlice: { isAuth: true } })).toMatchTypeOf<boolean>();
    });
    test('getIsLoading from AuthSlice', () => {
        expect(getIsLoading({ AuthSlice: { isLoading: undefinedValue } })).toBe(false);
        expectTypeOf(getIsLoading({ AuthSlice: { isLoading: undefinedValue } })).toMatchTypeOf<boolean>();
        expect(getIsLoading({ AuthSlice: { isLoading: true } })).toEqual(true);
        expectTypeOf(getIsLoading({ AuthSlice: { isLoading: true } })).toMatchTypeOf<boolean>();
    });
    test('getUpdateError from AuthSlice', () => {
        expect(getUpdateError({ AuthSlice: { updateError: undefinedValue } })).toBe('');
        expectTypeOf(getUpdateError({ AuthSlice: { updateError: undefinedValue } })).toMatchTypeOf<string>();
        expect(getUpdateError({ AuthSlice: { updateError: 'error rororo' } })).toEqual('error rororo');
        expectTypeOf(getUpdateError({ AuthSlice: { updateError: 'error rororo' } })).toMatchTypeOf<string>();
    });
    test('getCards from AuthSlice', () => {
        expect(getCards({ AuthSlice: { cards: undefinedValue } })).toEqual([]);
        expectTypeOf(getCards({ AuthSlice: { cards: undefinedValue } })).toMatchTypeOf<ICard[]>();
        expect(getCards({ AuthSlice: { cards: fakeCards } })).toEqual(fakeCards);
        expectTypeOf(getCards({ AuthSlice: { cards: fakeCards } })).toMatchTypeOf<ICard[]>();
    });
    test('getChangeCard from AuthSlice', () => {
        expect(getChangeCard({ AuthSlice: { changeCard: undefinedValue } })).toEqual({
            id: 0,
            word: '',
            translate: '',
            theme: '',
            note: '',
            time: 0,
            color: 'red',
            favorite: false,
        });
        expectTypeOf(getChangeCard({ AuthSlice: { changeCard: undefinedValue } })).toMatchTypeOf<ICard>();
        expect(getChangeCard({ AuthSlice: { changeCard: oneCard } })).toEqual(oneCard);
        expectTypeOf(getChangeCard({ AuthSlice: { changeCard: oneCard } })).toMatchTypeOf<ICard>();
    });
    test('getSelectOptions from AuthSlice', () => {
        expect(getSelectOptions({ AuthSlice: { selectOptions: undefinedValue } })).toEqual([]);
        expectTypeOf(getSelectOptions({ AuthSlice: { selectOptions: undefinedValue } })).toMatchTypeOf<string[]>();
        expect(getSelectOptions({ AuthSlice: { selectOptions: optionsArray } })).toEqual(optionsArray);
        expectTypeOf(getSelectOptions({ AuthSlice: { selectOptions: optionsArray } })).toMatchTypeOf<string[]>();
    });
    test('getSelectedTheme from AuthSlice', () => {
        expect(getSelectedTheme({ AuthSlice: { selectedTheme: undefinedValue } })).toEqual('');
        expectTypeOf(getSelectedTheme({ AuthSlice: { selectedTheme: undefinedValue } })).toMatchTypeOf<string>();
        expect(getSelectedTheme({ AuthSlice: { selectedTheme: 'theme1' } })).toEqual('theme1');
        expectTypeOf(getSelectedTheme({ AuthSlice: { selectedTheme: 'theme1' } })).toMatchTypeOf<string>();
    });
    test('getServerMessage from AuthSlice', () => {
        expect(getServerMessage({ AuthSlice: { serverMessage: undefinedValue } })).toEqual('');
        expectTypeOf(getServerMessage({ AuthSlice: { serverMessage: undefinedValue } })).toMatchTypeOf<string>();
        expect(getServerMessage({ AuthSlice: { serverMessage: 'fetching error' } })).toEqual('fetching error');
        expectTypeOf(getServerMessage({ AuthSlice: { serverMessage: 'fetching error' } })).toMatchTypeOf<string>();
    });
});

describe('Reducer tests', () => {
    test(' reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setServerMessage(''))).toEqual({
            ...authorizationData,
            serverMessage: '',
        });
        expect(AuthSlice({ ...authorizationData }, setServerMessage('Ошибка регистрации'))).toEqual({
            ...authorizationData,
            serverMessage: 'Ошибка регистрации',
        });
        expect(
            AuthSlice({ ...authorizationData, serverMessage: 'вы вошли в акк' }, setServerMessage('Вы вышли из аака')),
        ).toEqual({
            ...authorizationData,
            serverMessage: 'Вы вышли из аака',
        });
    });
    test('setAvatar reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setAvatar(''))).toEqual({
            ...authorizationData,
            avatar: '',
        });
        expect(AuthSlice({ ...authorizationData }, setAvatar('some blob'))).toEqual({
            ...authorizationData,
            avatar: 'some blob',
        });
        expect(AuthSlice({ ...authorizationData, avatar: 'some blob' }, setAvatar(''))).toEqual({
            ...authorizationData,
            avatar: '',
        });
    });
    test('setAvatar reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setAvatar(''))).toEqual({
            ...authorizationData,
            avatar: '',
        });
        expect(AuthSlice({ ...authorizationData }, setAvatar('some blob'))).toEqual({
            ...authorizationData,
            avatar: 'some blob',
        });
    });
    test('setSelectedTheme reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setSelectedTheme(''))).toEqual({
            ...authorizationData,
            selectedTheme: '',
        });
        expect(AuthSlice({ ...authorizationData }, setSelectedTheme('them e1'))).toEqual({
            ...authorizationData,
            selectedTheme: 'them e1',
        });
        expect(
            AuthSlice({ ...authorizationData, selectedTheme: 'them e12' }, setSelectedTheme('some text of theme')),
        ).toEqual({
            ...authorizationData,
            selectedTheme: 'some text of theme',
        });
    });
    test('setSelectOptions reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setSelectOptions([]))).toEqual({
            ...authorizationData,
            selectOptions: [],
        });
        expect(AuthSlice({ ...authorizationData }, setSelectOptions(optionsArray))).toEqual({
            ...authorizationData,
            selectOptions: optionsArray,
        });
        expect(
            AuthSlice(
                { ...authorizationData, selectOptions: optionsArray },
                setSelectOptions([...optionsArray, 'thememe2']),
            ),
        ).toEqual({
            ...authorizationData,
            selectOptions: [...optionsArray, 'thememe2'],
        });
    });
    test('setChangeCard reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setChangeCard(oneCard))).toEqual({
            ...authorizationData,
            changeCard: oneCard,
        });
        expect(
            AuthSlice({ ...authorizationData, changeCard: oneCard }, setChangeCard(authorizationData.changeCard)),
        ).toEqual({
            ...authorizationData,
            changeCard: authorizationData.changeCard,
        });
    });
    test('setCurrentDictionary reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setCurrentDictionary('nother dictji9f320923'))).toEqual({
            ...authorizationData,
            currentDictionary: 'nother dictji9f320923',
        });
        expect(
            AuthSlice(
                { ...authorizationData, currentDictionary: 'nother dictji9f320923' },
                setCurrentDictionary('first d'),
            ),
        ).toEqual({ ...authorizationData, currentDictionary: 'first d' });
    });
    test('setID reducer', () => {
        expect(AuthSlice({ ...authorizationData, cards: cardsWithWrongOrder }, setID())).toEqual({
            ...authorizationData,
            cards: cardsWithRightOrder,
        });
    });
    test('setCards reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setCards([]))).toEqual({
            ...authorizationData,
            cards: [],
        });
        expect(AuthSlice({ ...authorizationData }, setCards(cardsWithRightOrder))).toEqual({
            ...authorizationData,
            cards: cardsWithRightOrder,
        });
    });
    test('setData reducer', () => {
        expect(AuthSlice({ ...authorizationData }, setData(dataAfterAssignment))).toEqual({
            ...authorizationData,
            data: dataAfterAssignment,
        });
        expect(AuthSlice({ ...authorizationData, data: dataAfterAssignment }, setData(defaultUserData))).toEqual({
            ...authorizationData,
            data: defaultUserData,
        });
    });
    test('changeDictionary reducer', () => {
        expect(
            AuthSlice({ ...authorizationData, data: dataAfterAssignment }, changeDictionary('anotherDictionary')),
        ).toEqual({
            ...authorizationData,
            data: dataAfterAssignment,
            cards: dataAfterAssignment['anotherDictionary'].cards,
            selectOptions: dataAfterAssignment['anotherDictionary'].selectOptions,
        });
    });
});
