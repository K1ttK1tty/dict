import { FC, memo, useState } from 'react';

import DropDownMenu from './UI/DropDownMenu/DropDownMenu';
import DropDownColors from './UI/MySelect/DropDownColors';
import styles from './UI/MySelect/MySelect.module.css';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

import { setSelectedTheme } from '../store/reducers/authorization/Authorization/AuthSlice';

import { ISetOptions } from '../models/models';

import { getSelectOptions } from '../Tests/StoreTests/Selectors';

const SetOptions: FC<ISetOptions> = memo(function ({
    replaceOption,
    openEditThemeModal,
    setSelectedColorOrNewLabel,
    isSelectOpen,
    setIsSelectOpen,
}) {
    const selectOptions = useAppSelector(getSelectOptions);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [isColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const dispatch = useAppDispatch();
    if (isSelectOpen.open !== openDropDown) {
        if (!isSelectOpen.open) setOpenDropDown(false);
    }
    const dropDownMenuClassName = openDropDown ? [styles.dropDown, styles.open].join(' ') : styles.dropDown;
    return (
        <div data-testid="selectOptions" id="options">
            <DropDownMenu
                isMenuOpen={openDropDown}
                setIsMenuOpen={setOpenDropDown}
                dinamicClassName={dropDownMenuClassName}
                content={
                    <DropDownColors
                        setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
                        setIsSelectOpen={setIsSelectOpen}
                    />
                }
            />
            <div className={styles.options}>
                <div onMouseDown={e => e.stopPropagation()}>
                    <div onMouseDown={openEditThemeModal} className={styles.optionsOption}>
                        Редактирование Тем
                    </div>
                </div>
                <hr />
                {
                    <div className={styles.relative} onMouseDown={e => e.stopPropagation()}>
                        <div
                            onMouseDown={() => {
                                setSelectedColorOrNewLabel('Избранное');
                                setIsSelectOpen({ open: false, removeMark: true });
                                dispatch(setSelectedTheme(''));
                            }}
                            className={styles.optionsOption}
                        >
                            Избранное
                        </div>
                    </div>
                }
                {isColorsInCards && (
                    <div className={styles.relative} onMouseDown={e => e.stopPropagation()}>
                        <div onMouseDown={() => setOpenDropDown(!openDropDown)} className={styles.optionsOption}>
                            Цвета
                        </div>
                    </div>
                )}
                {selectOptions.map((option, id) => (
                    <div onMouseDown={replaceOption} className={styles.optionsOption} key={option + id}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
});
export default SetOptions;
