import { ICard } from '../store/storeModels';

export const getRandomInt = (max: number): number => {
    if (max <= 0) return 0;
    return Math.floor(Math.random() * max);
};

export const getArrayWithRandomValue = (array: ICard[], maxIterations: number): ICard[] => {
    const arr: ICard[] = [];
    if (array.length) {
        for (let index = 0; index < maxIterations; index++) {
            arr.push(array[getRandomInt(array.length)]);
        }
    }
    return arr;
};
