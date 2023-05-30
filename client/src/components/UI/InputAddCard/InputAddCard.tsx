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
    register?: T;
}
export default function InputAddCard<T>(props: IInputProps<T>) {
    const element = props.modalAdd ? props.modalAdd : props.modalChangeCard;
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        if (props.setValue) {
            props.setValue(element.value);
        }
    };

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