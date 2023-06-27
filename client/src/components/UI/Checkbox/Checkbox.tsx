import { FC, memo } from 'react';
import style from './Checkbox.module.css';
interface ICheckbox {
    id: string;
    defaultChecked: boolean;
    dinamicClassName?: string;
    callback: React.ChangeEventHandler<HTMLInputElement>;
}
const Checkbox: FC<ICheckbox> = memo(function ({ id, defaultChecked, dinamicClassName, callback }) {
    return (
        <>
            <input
                id={id}
                className={style.input}
                defaultChecked={defaultChecked}
                onChange={callback}
                type="checkbox"
            />
            <label htmlFor={id} className={[style.label, dinamicClassName].join(' ')}></label>
        </>
    );
});
export default Checkbox;