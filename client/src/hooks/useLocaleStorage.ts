import { useState, useEffect } from 'react';
import { TUseLocaleStorage } from '../models/models';
export const useLocaleStorage: TUseLocaleStorage = (name, state) => {
    const storageValue = localStorage.getItem(name);
    let initialState;
    if (storageValue) {
        initialState = JSON.parse(storageValue);
    } else initialState = state;

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(value));
    }, [value, name]);
    return [value, setValue];
};