import { FC } from 'react';
import style from './TextArea.module.css';
import { ITextArea } from './TextAreaModel';
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