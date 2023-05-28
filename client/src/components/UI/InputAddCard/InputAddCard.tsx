// libs
import { FC, memo } from 'react';
// styles
import cl from './inputAddCard.module.css';
// types
interface IInputProps {
    inputValue?: string;
    placeholder?: string;
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    modalChangeCard?: React.MutableRefObject<HTMLInputElement | null>;
    setValue?: (a: string) => void;
    dinamicclassname: string;
    type?: string;
    register?: any;
}
const InputAddCard: FC<IInputProps> = memo(function (
    {
        inputValue,
        placeholder,
        modalAdd,
        modalChangeCard,
        setValue,
        dinamicclassname,
        type,
        register,
        ...props
    }
) {
    const element = modalAdd ? modalAdd : modalChangeCard;
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        if (setValue) {
            setValue(element.value);
        }
    };
    return (
        <input
            ref={element}
            type={type}
            placeholder={placeholder}
            className={[cl.www, dinamicclassname].join(' ')}
            value={inputValue}
            onChange={setInputValue}
            {...register}
            {...props}
        />
    );
});
export default InputAddCard;