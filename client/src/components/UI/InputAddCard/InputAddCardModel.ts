export interface IInputProps<T> {
    inputValue?: string | number;
    placeholder?: string;
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    modalChangeCard?: React.MutableRefObject<HTMLInputElement | null>;
    setValue?: (a: string) => void;
    dinamicclassname?: string;
    type?: string;
    themeValue?: string;
    defaultTheme?: string;
    setDefaultTheme?: (state: string) => void;
    disabled?: boolean;
    testId?:string;
    register?: T;
}
