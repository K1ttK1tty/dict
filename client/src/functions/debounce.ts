import { TDebounce } from '../components/UI/Modal/ModalsModels';
export const debounce: TDebounce<() => void> = (variable, setId, callback, time) => {
    clearTimeout(variable);
    setId(
        setTimeout(() => {
            callback();
        }, time),
    );
};
