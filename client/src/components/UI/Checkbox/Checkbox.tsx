import { FC, memo, useId } from 'react';

import style from './Checkbox.module.css';

import { ICheckbox } from './CheckboxModel';

const Checkbox: FC<ICheckbox> = memo(function ({
    id,
    defaultChecked,
    dinamicClassName,
    dinamicClassNameWrapper,
    checked,
    callback,
}) {
    const differentId = `${useId()}-${id}`;
    return (
        <div className={style.relative + ` ${dinamicClassNameWrapper}`}>
            <input
                id={differentId}
                className={style.input}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={callback}
                type="checkbox"
                role="checkbox"
            />
            <label htmlFor={differentId} className={[style.label, dinamicClassName].join(' ')}></label>
        </div>
    );
});
export default Checkbox;
