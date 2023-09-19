import { ICard, IDataStructure } from '../../store/storeModels';

const monthObject = new Map([
    [0, 'Январь'],
    [1, 'Февраль'],
    [2, 'Март'],
    [3, 'Апрель'],
    [4, 'Май'],
    [5, 'Июнь'],
    [6, 'Июль'],
    [7, 'Август'],
    [8, 'Сентябрь'],
    [9, 'Октябрь'],
    [10, 'Ноябрь'],
    [11, 'Декабрь'],
]);
const months = new Map([
    ['Январь', 0],
    ['Февраль', 0],
    ['Март', 0],
    ['Апрель', 0],
    ['Май', 0],
    ['Июнь', 0],
    ['Июль', 0],
    ['Август', 0],
    ['Сентябрь', 0],
    ['Октябрь', 0],
    ['Ноябрь', 0],
    ['Декабрь', 0],
]);
export const numberOfCards = (dictionaryName: string, data: IDataStructure) => {
    if (data[dictionaryName]) return data[dictionaryName].cards.length;
    else return 0;
};
export const getAllCards = (data: IDataStructure) => {
    const keys = Object.keys(data);
    let allCards: ICard[] | [] = [];
    for (let index = 0; index < keys.length; index++) {
        data[keys[index]];
        const y = data[keys[index]].cards;
        allCards = [...allCards, ...y];
    }
    return allCards;
};
export const getYearsArray = (index: number, data: IDataStructure, all = false) => {
    const ttt = new Map();
    const array = all ? getAllCards(data) : data[Object.keys(data)[index]].cards;
    const newArray = array.length > 0 ? [...array] : [];
    if (all) {
        // sorting by time
        for (let k = 0; k < newArray.length - 1; k++) {
            for (let index = 0; index < newArray.length - 1; index++) {
                const element = newArray[index];
                if (newArray[index + 1].time < element.time) {
                    newArray[index] = newArray[index + 1];
                    newArray[index + 1] = element;
                }
            }
        }
    }
    newArray.forEach(card => {
        const cardDate = new Date(card.time);
        const cardYear = cardDate.getFullYear();
        if (ttt.get(cardYear) >= 0) {
            ttt.set(cardYear, ttt.get(cardYear) + 1);
        } else ttt.set(cardYear, 1);
    });
    const keys: string[] = array.length > 0 ? [(new Date(newArray[0].time).getFullYear() - 1).toString()] : [];
    const numbers: number[] = array.length > 0 ? [0] : [];

    // key=>year,value=>value
    for (const [key, value] of ttt) {
        const previos = Number(keys[keys.length - 1]);
        if (key - previos > 1) {
            for (let index = previos; index < key - 1; index++) {
                keys.push((index + 1).toString());
                numbers.push(0);
            }
        }
        keys.push(key.toString());
        numbers.push(value);
    }
    return { keys, numbers, count: newArray.length };
};
export const getMonths = (index: number, data: IDataStructure, all = false) => {
    const ttt = new Map();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const array = all ? getAllCards(data) : data[Object.keys(data)[index]].cards;
    array.forEach(card => {
        const cardDate = new Date(card.time);
        const cardMonth = monthObject.get(cardDate.getMonth());
        const cardYear = cardDate.getFullYear();
        if (cardYear === currentYear && ttt.get(cardMonth) >= 0) {
            ttt.set(cardMonth, ttt.get(monthObject.get(cardDate.getMonth())) + 1);
        } else if (cardYear === currentYear && !ttt.get(cardMonth)) ttt.set(cardMonth, 1);
    });
    const keys: string[] = [];
    const numbers: number[] = [];
    for (const value of months.keys()) {
        keys.push(value);
        if (ttt.get(value)) numbers.push(ttt.get(value));
        else numbers.push(0);
        if (value === monthObject.get(currentMonth)) break;
    }
    return { keys, numbers, count: array.length };
};
export const getDays = (index: number, data: IDataStructure, all = false) => {
    const ttt = new Map();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const array = all ? getAllCards(data) : data[Object.keys(data)[index]].cards;
    array.forEach(card => {
        const cardDate = new Date(card.time);
        const cardMonth = monthObject.get(cardDate.getMonth());
        const cardYear = cardDate.getFullYear();
        const cardDay = cardDate.getDate();
        const isSameYear = cardYear === currentYear;
        const isSameMonth = monthObject.get(currentMonth) === cardMonth;

        if (isSameMonth && isSameYear && ttt.get(cardDay) >= 0) {
            ttt.set(cardDay, ttt.get(cardDay) + 1);
        } else if (isSameMonth && isSameYear && !ttt.get(cardDay)) {
            ttt.set(cardDay, 1);
        }
    });

    const keys: string[] = [];
    const numbers: number[] = [];
    for (let index = 1; index < 32; index++) {
        keys.push(index.toString() + ' день');
        if (ttt.get(index)) {
            numbers.push(ttt.get(index));
        } else numbers.push(0);
        if (index === currentDay) break;
    }
    return { keys, numbers, count: array.length };
};
export const getColorsInDictionary = (index: number, data: IDataStructure, all = false) => {
    let green = 0;
    let orange = 0;
    let red = 0;
    const array = all ? getAllCards(data) : data[Object.keys(data)[index]].cards;
    array.forEach(card => {
        if (card.color === 'green') green += 1;
        if (card.color === 'orange') orange += 1;
        if (card.color === 'red') red += 1;
    });
    return [red, orange, green];
};
