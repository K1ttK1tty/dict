import { FC, memo } from 'react';
import cl from './inputAddCard.module.css';
interface IInputProps {
    inputValue: string;
    placeholder?: string;
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    modalChangeCard?: React.MutableRefObject<HTMLInputElement>;
    setValue: (a: string) => void;
    dinamicclassname: string;
    type?: string;
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
        ...props
    }
) {
    const element = modalAdd ? modalAdd : modalChangeCard;
    return (
        <input
            ref={element}
            type={type}
            placeholder={placeholder}
            className={[cl.www, dinamicclassname].join(' ')}
            value={inputValue}
            onChange={e => setValue(e.target.value)}
            {...props}
        />
    );
});
export default InputAddCard;