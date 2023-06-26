import { FC } from 'react';
// style
import style from './TextArea.module.css';
interface ITextArea {
    dinamicClassName?: string;
    placeholder?: string;
    inputValue?: string | number;
    setValue?: (a: string) => void;
}
const TextArea: FC<ITextArea> = function ({ placeholder, inputValue, setValue }) {
    const typeSmth = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (setValue) {
            setValue(e.target.value);
        }
    };
    return (
        <textarea
            placeholder={placeholder}
            className={style.textArea}
            value={inputValue}
            onChange={typeSmth}
        />
    );
};
export default TextArea;