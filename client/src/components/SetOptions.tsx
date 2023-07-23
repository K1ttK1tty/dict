import { FC, useState, memo } from 'react';
// components
import DropDownMenu from './UI/DropDownMenu/DropDownMenu';
import DropDownColors from './UI/MySelect/DropDownColors';
// styles
import styles from './UI/MySelect/MySelect.module.css';
// redux
import { useAppSelector } from '../hooks/redux';
// types
import { ISetOptions } from '../models/models';
const SetOptions: FC<ISetOptions> = memo(function (
    {
        replaceOption,
        openEditThemeModal,
        setSelectedColorOrNewLabel,
        isSelectOpen,
        setIsSelectOpen,
        isColorsInCards
    }) {
    const { selectOptions } = useAppSelector(state => state.AuthSlice);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    if (isSelectOpen.open !== openDropDown) {
        if (!isSelectOpen.open) {
            setOpenDropDown(false);
        }
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