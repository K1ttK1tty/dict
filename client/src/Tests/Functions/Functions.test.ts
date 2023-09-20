import { describe, expect, expectTypeOf, test } from 'vitest';

import { changeCardFields } from '../../functions/changeCardFields';
import { cutLongLine } from '../../functions/cutLongLine';
import { getArrayWithRandomValue, getRandomInt } from '../../functions/getRandomInt';
import { isNotEmpty } from '../../functions/isNotEmpty';
import { overrideTheme } from '../../functions/overrideTheme';
import { overrideThemesInCards } from '../../functions/overrideThemesInCards';

import { isNewLabel } from '../../globalConsts/globalConsts';

import { ICard } from '../../store/storeModels';

import {
    cardsWithNewTheme,
    mockThemes,
    mokedCards,
    mokedNewCard,
    mokedOldCard,
    mokedReturnedCards,
    newThemes,
    withoutIdCard,
} from './funcTestsConsts';

describe('Functions', () => {
    describe('isNewLabel', () => {
        const oneDay = 1000 * 60 * 60 * 24; // 24 hours
        test('correct', () => {
            expect(isNewLabel(Date.now())).toBe(true);
        });
        test('equal', () => {
            expect(isNewLabel(Date.now() - oneDay)).toBe(true);
        });
        test('incorrect1', () => {
            expect(isNewLabel(Date.now() - oneDay - 1)).toBe(false);
        });
        test('incorrect2', () => {
            expect(isNewLabel(Date.now() - oneDay * 2)).toBe(false);
        });
    });
    describe('isNotEmpty', () => {
        test('empty', () => {
            expect(isNotEmpty('')).toBe(false);
        });
        test('empty with space', () => {
            expect(isNotEmpty('    ')).toBe(false);
        });
        test('one symbol', () => {
            expect(isNotEmpty('2')).toBe(true);
        });
        test('space before and after', () => {
            expect(isNotEmpty('  asdf  2 5 asdflf    ')).toBe(true);
        });
    });
    describe('cutLongLine', () => {
        test('empty', () => {
            expect(cutLongLine('', 2)).toEqual('');
            expect(cutLongLine('', 6)).toEqual('');
            expect(cutLongLine('', 0)).toEqual('');
            expect(cutLongLine('', -1)).toEqual('');
        });
        test('cases', () => {
            expect(cutLongLine('1234', 4)).toEqual('1234');
            expect(cutLongLine('1234', 2)).toEqual('123...');
            expect(cutLongLine('1234', 0)).toEqual('');
            expect(cutLongLine('1234', 1)).toEqual('12...');
            expect(cutLongLine('1234', 3)).toEqual('1234');
            expect(cutLongLine('1234', 6)).toEqual('1234');
        });
    });
    describe('getRandomInt', () => {
        test('cases', () => {
            expect(getRandomInt(0)).toBe(0);
            expect(getRandomInt(-1)).toBe(0);
            expect(getRandomInt(3)).toBeLessThan(3);
            expect(getRandomInt(3)).toBeGreaterThanOrEqual(0);
        });
    });
    describe('getArrayWithRandomValue', () => {
        test('type checking', () => {
            expectTypeOf(getArrayWithRandomValue(mokedCards, 1)).toMatchTypeOf<ICard[]>();
            expectTypeOf(getArrayWithRandomValue(mokedCards, 7)).toMatchTypeOf<ICard[]>();
        });
        test('emptyArray', () => {
            expectTypeOf(getArrayWithRandomValue(mokedCards, -1)).toBeArray();
            expect(getArrayWithRandomValue(mokedCards, -1)).toEqual([]);
        });
    });
    describe('changeCardFields', () => {
        test('success', () => {
            expect(changeCardFields(mokedCards, mokedOldCard, mokedNewCard)).toEqual(mokedReturnedCards);
        });
        test('without id matching', () => {
            expect(changeCardFields(mokedCards, withoutIdCard, mokedNewCard)).toEqual(mokedCards);
        });
    });
    describe('overrideThemesInCards', () => {
        test('success', () => {
            expect(overrideThemesInCards(mokedCards, 'theme', 'changeTheme')).toEqual(cardsWithNewTheme);
        });
        test('without themes matching', () => {
            expect(overrideThemesInCards(mokedCards, 'tetetetetete', 'changeTheme')).toEqual(mokedCards);
        });
    });
    describe('overrideTheme', () => {
        test('success', () => {
            expect(overrideTheme(mockThemes, 'theme1', 'abobo')).toEqual(newThemes);
        });
        test('without theme matching', () => {
            expect(overrideTheme(mockThemes, 'tetetetetete', 'changeTheme')).toEqual(mockThemes);
        });
    });
});
