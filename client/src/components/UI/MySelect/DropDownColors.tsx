import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/redux';

import styles from './MySelect.module.css';

import { setSelectedTheme } from '../../../store/reducers/authorization/Authorization/AuthSlice';

import { ISetSelectedColor, TSelectColorOrNew } from './MySelectModel';

const DropDownColors: FC<ISetSelectedColor> = function ({ setSelectedColorOrNewLabel, setIsSelectOpen }) {
    const dispatch = useAppDispatch();
    const selectColor = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const button = e.target as HTMLButtonElement;
        if (button.dataset.selectcolorornew) {
            setSelectedColorOrNewLabel(button.dataset.selectcolorornew as TSelectColorOrNew);
            dispatch(setSelectedTheme(''));
            setIsSelectOpen({ open: false, removeMark: true });
        }
    };
    return (
        <>
            <button
                data-testid="redColorInSelect"
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.red].join(' ')}
                data-selectcolorornew="red"
            />
            <button
                data-testid="orangeColorInSelect"
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.orange].join(' ')}
                data-selectcolorornew="orange"
            />
            <button
                data-testid="greenColorInSelect"
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.green].join(' ')}
                data-selectcolorornew="green"
            />
            <button
                data-testid="newMarkInSelect"
                onMouseDown={selectColor}
                className={[styles.colorBlock, styles.new].join(' ')}
                data-selectcolorornew="new"
                children="new"
            />
        </>
    );
};
export default DropDownColors;
