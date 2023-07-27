import { FC, useState, memo } from 'react';
// components
import DropDownMenu from './UI/DropDownMenu/DropDownMenu';
import DropDownColors from './UI/MySelect/DropDownColors';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage';
// styles
import styles from './UI/MySelect/MySelect.module.css';
// redux
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setSelectedTheme } from '../store/reducers/authorization/Authorization/AuthSlice';
// types
import { ISetOptions } from '../models/models';
const SetOptions: FC<ISetOptions> = memo(function (
    {
        replaceOption,
        openEditThemeModal,
        setSelectedColorOrNewLabel,
        isSelectOpen,
        setIsSelectOpen,
    }) {
    const { selectOptions } = useAppSelector(state => state.AuthSlice);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [isColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const dispatch = useAppDispatch();
    if (isSelectOpen.open !== openDropDown) {
        if (!isSelectOpen.open) setOpenDropDown(false);
    }
    const dropDownMenuClassName = openDropDown
        ? [styles.dropDown, styles.open].join(' ')
        : styles.dropDown;
    return (
        <div id="options">
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
                        <div onMouseDown={() => {
                            setSelectedColorOrNewLabel('Избранное');
                            setIsSelectOpen({ open: false, removeMark: true });
                            dispatch(setSelectedTheme(''));
                        }}
                            className={styles.optionsOption}
                        >
                            Избранное
                        </div>
                    </div >
                }
                {
                    isColorsInCards && <div className={styles.relative} onMouseDown={e => e.stopPropagation()}>
                        <div onMouseDown={() => setOpenDropDown(!openDropDown)} className={styles.optionsOption}>
                            Цвета
                        </div>
                    </div >
                }
                {
                    selectOptions.map((option, id) =>
                        <div onMouseDown={replaceOption} className={styles.optionsOption} key={option + id}>
                            {option}
                        </div>
                    )
                }
            </div>
        </div >
    );
});
export default SetOptions;