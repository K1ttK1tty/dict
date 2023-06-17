// styles
import cl from './inputAddCard.module.css';
// types
interface IInputProps<T> {
    inputValue?: string | number;
    placeholder?: string;
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    modalChangeCard?: React.MutableRefObject<HTMLInputElement | null>;
    setValue?: (a: string) => void;
    dinamicclassname: string;
    type?: string;
    themeValue?: string;
    defaultTheme?: string;
    setDefaultTheme?: (state: string) => void;
    register?: T;
}
export default function InputAddCard<T>(props: IInputProps<T>) {
    const element = props.modalAdd ? props.modalAdd : props.modalChangeCard;
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        // console.log(element.value);
        if (props.setValue) {
            props.setValue(element.value);
        }
    };
    const onChangeThemeAddCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setDefaultTheme) {
            console.log(e.target.value)
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
            {...props.register}
        />
    );

}