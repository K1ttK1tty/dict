import { useEffect, useState } from 'react';

export const useLocaleStorage = <T>(name: string, state: T) => {
    const storageValue = localStorage.getItem(name);
    let initialState:T;
    if (storageValue) {
        initialState = JSON.parse(storageValue);
    } else initialState = state;

    const [value, setValue] = useState<T>(initialState);
    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(value));
    }, [value, name]);
    return [value, setValue] as const;
};
