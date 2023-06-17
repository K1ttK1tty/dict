import { FC, ChangeEventHandler } from 'react';
import style from './Checkbox.module.css';
interface ICheckbox {
    id: string;
    defaultChecked: boolean;
    dinamicClassName?: string;
    callback: ChangeEventHandler<HTMLInputElement>;
}
const Checkbox: FC<ICheckbox> = function ({ id, defaultChecked, dinamicClassName, callback }) {

    return (
        <>
            <input
                id={id}
                className={style.input}
                defaultChecked={defaultChecked}
                onChange={callback}
                type="checkbox"
            />
            <label htmlFor={id} className={[style.label,dinamicClassName].join(' ')}></label>
        </>
    );
};
export default Checkbox;