import { FC, memo } from 'react';
import style from './Checkbox.module.css';
import { ICheckbox } from './CheckboxModel';
const Checkbox: FC<ICheckbox> = memo(function ({ id, defaultChecked, dinamicClassName, callback }) {
    return (
        <div className={style.relative}>
            <input
                id={id}
                className={style.input}
                defaultChecked={defaultChecked}
                onChange={callback}
                type="checkbox"
            />
            <label htmlFor={id} className={[style.label, dinamicClassName].join(' ')}></label>
        </div>
    );
});
export default Checkbox;