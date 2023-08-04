import cl from './inputAddCard.module.css';

import { IInputProps } from './InputAddCardModel';

export default function InputAddCard<T>(props: IInputProps<T>) {
    const element = props.modalAdd ? props.modalAdd : props.modalChangeCard;
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        if (props.setValue) {
            props.setValue(input.value);
        }
    };
    const onChangeThemeAddCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setDefaultTheme) {
            props.setDefaultTheme(e.target.value);
        }
    };
    if (props.setDefaultTheme) {
        return (
            <input
                ref={element}
                placeholder={props.placeholder}
                className={[cl.www, props.dinamicclassname].join(' ')}
                value={props.defaultTheme}
                onChange={onChangeThemeAddCard}
                disabled={props.disabled}
                data-testid={props.testId}
            />
        );
    }
    return (
        <input
            ref={element}
            type={props.type}
            placeholder={props.placeholder}
            className={[cl.www, props.dinamicclassname].join(' ')}
            value={props.inputValue}
            onChange={setInputValue}
            disabled={props.disabled}
            data-testid={props.testId}
            {...props.register}
        />
    );
}
