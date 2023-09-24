import { describe, expect, test } from 'vitest';

import { IDataStructure } from '../../store/storeModels';

import {
    getAllCards,
    getColorsInDictionary,
    getDays,
    getMonths,
    getYearsArray,
    numberOfCards,
} from '../../pages/Others/StatisticsData';

import {
    authorizationData,
    dataWithCardsForStatisticsPage,
    dataWithoutCardsForStatisticsPage,
} from '../ComponentsTest/TestsConsts';

describe('Statistics page functions', () => {
    describe('numberOfCards function', () => {
        test('with cards in two dictionaries', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            const y = numberOfCards('default', data);
            expect(y).toBe(6);
        });
        test('if is there is no cards', () => {
            const data: IDataStructure = authorizationData.data;
            const y = numberOfCards('default', data);
            expect(y).toBe(0);
        });
        test('if is there is no "dictionaryName"', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            const y = numberOfCards('34yfn23/', data);
            expect(y).toBe(0);
        });
    });
    describe('getAllCards function', () => {
        test('with 12', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            expect(getAllCards(data)).toEqual([
                ...dataWithCardsForStatisticsPage.data.default.cards,
                ...dataWithCardsForStatisticsPage.data.second.cards,
            ]);
        });
        test('with 0', () => {
            const data: IDataStructure = authorizationData.data;
            expect(getAllCards(data)).toEqual([]);
        });
    });
    describe('getYearsArray function', () => {
        test('normal, without "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            expect(getYearsArray(0, data)).toEqual({
                keys: ['2019', '2020', '2021', '2022', '2023'],
                numbers: [0, 4, 1, 0, 1],
                count: 6,
            });
        });
        test('normal, with "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            expect(getYearsArray(0, data, true)).toEqual({
                keys: ['2019', '2020', '2021', '2022', '2023'],
                numbers: [0, 8, 2, 0, 2],
                count: 12,
            });
        });
        test('with another data, without "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            data.default.cards[0].time = 1301131025684; // 2011
            expect(getYearsArray(0, data)).toEqual({
                keys: [
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019',
                    '2020',
                    '2021',
                    '2022',
                    '2023',
                ],
                numbers: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 1],
                count: 6,
            });
        });
        test('without cards, without "all" prop', () => {
            const data: IDataStructure = dataWithoutCardsForStatisticsPage.data;
            expect(getYearsArray(0, data)).toEqual({
                keys: [],
                numbers: [],
                count: 0,
            });
        });
        test('without cards, with "all" props', () => {
            const data: IDataStructure = dataWithoutCardsForStatisticsPage.data;
            expect(getYearsArray(0, data, true)).toEqual({
                keys: [],
                numbers: [],
                count: 0,
            });
        });
    });
    describe('getMonths function', () => {
        test('with data, without "all prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            data.default.cards[0].time = 1675037125684;
            data.default.cards[1].time = 1681337125684;
            data.default.cards[2].time = 1691337125684;
            expect(getMonths(0, data)).toEqual({
                // need to be updated every day
                keys: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
                numbers: [1, 0, 0, 1, 0, 0, 0, 2, 0], // need to be updated every day
                count: 6,
            });
        });
        test('with data, with "all prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            data.default.cards[0].time = 1675037125684;
            data.default.cards[1].time = 1681337125684;
            data.default.cards[2].time = 1691337125684;
            expect(getMonths(0, data, true)).toEqual({
                // need to be updated every day
                keys: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
                numbers: [1, 0, 0, 1, 0, 0, 0, 3, 0], // need to be updated every day
                count: 12,
            });
        });
        test('without data, with "all prop', () => {
            const data: IDataStructure = dataWithoutCardsForStatisticsPage.data;
            expect(getMonths(0, data, true)).toEqual({
                // keys:[from january to current month] same .lenght
                // numbers:[all 0, because there is a months in keys] same .lenght
                // need to be updated every day
                keys: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
                numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0], // need to be updated every day
                count: 0,
            });
        });
    });
    describe('getDays function', () => {
        test('with data, without "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            // xx.09.2023
            data.default.cards[3].time = 1693724989406; // 3
            data.default.cards[0].time = 1693724989406; // 3
            data.default.cards[1].time = 1694124989406; // 8
            data.default.cards[2].time = 1694324989406; // 10
            data.default.cards[5].time = 1694924989406; // 17
            data.default.cards[4].time = 1694924989406; // 17

            // keys:[from 0 to current day] same .lenght
            // numbers:[all 0, because there is a days in keys] same .lenght
            expect(getDays(0, data)).toEqual({
                // need to be updated every day
                keys: [
                    '1 день',
                    '2 день',
                    '3 день',
                    '4 день',
                    '5 день',
                    '6 день',
                    '7 день',
                    '8 день',
                    '9 день',
                    '10 день',
                    '11 день',
                    '12 день',
                    '13 день',
                    '14 день',
                    '15 день',
                    '16 день',
                    '17 день',
                    '18 день',
                    '19 день',
                    '20 день',
                    '21 день',
                    '22 день',
                    '23 день',
                    '24 день',
                ],// keys and numbers need to be updated every day
                numbers: [0, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], 
                count: 6,
            });
        });
        test('with data, with "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            // xx.09.2023
            data.default.cards[3].time = 1693724989406; // 3
            data.default.cards[0].time = 1693724989406; // 3
            data.default.cards[1].time = 1694124989406; // 8
            data.default.cards[2].time = 1694324989406; // 10
            data.default.cards[5].time = 1694924989406; // 17
            data.default.cards[4].time = 1694924989406; // 17

            data.second.cards[3].time = 1693724989406; // 3
            data.second.cards[0].time = 1693724989406; // 3
            data.second.cards[1].time = 1694124989406; // 8
            data.second.cards[2].time = 1694324989406; // 10
            data.second.cards[5].time = 1694924989406; // 17
            data.second.cards[4].time = 1694924989406; // 17

            expect(getDays(0, data, true)).toEqual({
                // need to be updated every day
                keys: [
                    '1 день',
                    '2 день',
                    '3 день',
                    '4 день',
                    '5 день',
                    '6 день',
                    '7 день',
                    '8 день',
                    '9 день',
                    '10 день',
                    '11 день',
                    '12 день',
                    '13 день',
                    '14 день',
                    '15 день',
                    '16 день',
                    '17 день',
                    '18 день',
                    '19 день',
                    '20 день',
                    '21 день',
                    '22 день',
                    '23 день',
                    '24 день',
                ],// keys and numbers need to be updated every day
                numbers: [0, 0, 4, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0], 
                count: 12,
            });
        });

        test('without data, with "all" prop', () => {
            const data: IDataStructure = dataWithoutCardsForStatisticsPage.data;
            // keys:[from 0 to current day] same .lenght
            // numbers:[all 0, because there is a days in keys] same .lenght
            expect(getDays(0, data, true)).toEqual({
                // need to be updated every day
                keys: [
                    '1 день',
                    '2 день',
                    '3 день',
                    '4 день',
                    '5 день',
                    '6 день',
                    '7 день',
                    '8 день',
                    '9 день',
                    '10 день',
                    '11 день',
                    '12 день',
                    '13 день',
                    '14 день',
                    '15 день',
                    '16 день',
                    '17 день',
                    '18 день',
                    '19 день',
                    '20 день',
                    '21 день',
                    '22 день',
                    '23 день',
                    '24 день',
                ],// keys and numbers need to be updated every day
                numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                count: 0,
            });
        });
    });
    describe('getColorsInDictionary function', () => {
        test('with data, without "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            expect(getColorsInDictionary(0, data)).toEqual([2, 2, 2]);
        });
        test('with data, with "all" prop', () => {
            const data: IDataStructure = dataWithCardsForStatisticsPage.data;
            expect(getColorsInDictionary(0, data, true)).toEqual([4, 4, 4]);
        });
        test('without data, with "all" prop', () => {
            const data: IDataStructure = dataWithoutCardsForStatisticsPage.data;
            expect(getColorsInDictionary(0, data, true)).toEqual([0, 0, 0]);
        });
    });
});
