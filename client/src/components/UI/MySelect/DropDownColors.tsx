import { FC } from 'react';
import styles from './MySelect.module.css';
import { ISetSelectedColor,TSelectColorOrNew } from './MySelectModel';
const DropDownColors: FC<ISetSelectedColor> = function ({ setSelectedColorOrNewLabel, setIsSelectOpen }) {
    const selectColor = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const button = e.target as HTMLButtonElement;
        if (button.dataset.selectcolorornew) {
            setSelectedColorOrNewLabel(button.dataset.selectcolorornew as TSelectColorOrNew);
            setIsSelectOpen({ open: false, removeMark: true });
        }
    };
    return (
        <>
            <button
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.red].join(' ')}
                data-selectcolorornew="red"
            />
            <button
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.orange].join(' ')}
                data-selectcolorornew="orange"
            />
            <button
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.green].join(' ')}
                data-selectcolorornew="green"
            />
            <button
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.new].join(' ')}
                data-selectcolorornew="new"
                children="new"
            />
        </>
    );
};
export default DropDownColors;