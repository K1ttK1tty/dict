import { FC, useId, memo } from 'react';
import style from './Checkbox.module.css';
import { ICheckbox } from './CheckboxModel';
const Checkbox: FC<ICheckbox> = memo(function ({ id, defaultChecked, dinamicClassName, callback }) {
    const differentId = `${useId()}-${id}`;
    return (
        <div className={style.relative}>
            <input
                id={differentId}
                className={style.input}
                defaultChecked={defaultChecked}
                onChange={callback}
                type="checkbox"
            />
            <label htmlFor={differentId} className={[style.label, dinamicClassName].join(' ')}></label>
        </div>
    );
});
export default Checkbox;