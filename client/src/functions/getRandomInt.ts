import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const getArrayWithRandomValue = (array: ICard[], maxIterations: number) => {
    const arr: ICard[] = [];
    for (let index = 0; index < maxIterations; index++) {
        arr.push(array[getRandomInt(array.length)]);
    }
    return arr;
};