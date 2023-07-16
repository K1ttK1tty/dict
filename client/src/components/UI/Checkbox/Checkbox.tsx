import { FC, useId, memo } from 'react';
import style from './Checkbox.module.css';
import { ICheckbox } from './CheckboxModel';
const Checkbox: FC<ICheckbox> = memo(function (
    { id,
        defaultChecked,
        dinamicClassName,
        dinamicClassNameWrapper,
        callback
    }) {
    const differentId = `${useId()}-${id}`;
    return (
        <div className={style.relative + ` ${dinamicClassNameWrapper}`}>
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