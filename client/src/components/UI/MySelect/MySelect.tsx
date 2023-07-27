// libs
import { FC, useState, useRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
// components
import SetOptions from '../../SetOptions';
import IconSelect from './icons/IconSelect';
// functions
import { cutLongLine } from '../../../functions/cutLongLine';
// styles
import styles from './MySelect.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSelectedTheme } from '../../../store/reducers/authorization/Authorization/AuthSlice';
// types
import { IMySelect } from './MySelectModel';
import { IOptionState } from '../../../store/storeModels';
const MySelect: FC<IMySelect> = memo(function (
    {
        setIsModal,
        isSelectOpen,
        setIsSelectOpen,
        setSelectedColorOrNewLabel,
        selectedColorOrNewLabel,
    }) {
    const dispatch = useAppDispatch();
    const { selectedTheme } = useAppSelector(state => state.AuthSlice);
    const selectWrapper = useRef<HTMLDivElement | null>(null);
    const [prev, setPrev] = useState<IOptionState>(isSelectOpen);
    if (prev.open !== isSelectOpen.open || prev.removeMark !== isSelectOpen.removeMark) {
        setPrev(isSelectOpen);
        if (isSelectOpen.open) {
            setTimeout(() => {
                if (selectWrapper.current) {
                    selectWrapper.current.focus();
                }
            }, 200);
        }
    }
    const openEditThemeModal = () => {
        setIsModal(true);
        setIsSelectOpen({ ...isSelectOpen, open: false });
    };
    const replaceOption = (element: React.MouseEvent<HTMLDivElement>) => {
        const divElement = element.target as HTMLDivElement;
        dispatch(setSelectedTheme(divElement.innerText));
        setIsSelectOpen({ open: false, removeMark: true });
        if (selectedColorOrNewLabel) {
            setSelectedColorOrNewLabel(null);
        }
    };
    const removeTheme = () => {
        dispatch(setSelectedTheme(''));
        setIsSelectOpen({ open: false, removeMark: false });
        setSelectedColorOrNewLabel(null);
    };
    const label = selectedColorOrNewLabel
        ? selectedColorOrNewLabel
        : selectedTheme
            ? cutLongLine(selectedTheme, 11)
            : 'Тема';
    return (
        <div
            className={styles.select}
            ref={selectWrapper}
            onKeyDown={() => setIsSelectOpen({ ...isSelectOpen, open: false })}
            onMouseDown={e => e.stopPropagation()}
            tabIndex={0}
        >
            <div
                onMouseDown={() => setIsSelectOpen({ ...isSelectOpen, open: !isSelectOpen.open })}
                className={[styles.title, 'ifNotThisThenClose'].join(' ')}
            >
                <div
                    className={[styles.selectValue, 'ifNotThisThenClose'].join(' ')}
                >
                    {label}
                </div>
                <div className={styles.selectIcon}><IconSelect /></div>
            </div>
            {
                isSelectOpen.removeMark &&
                <button onClick={removeTheme} className={styles.removeTheme}>&times;</button>
            }
            <CSSTransition
                in={isSelectOpen.open}
                timeout={180}
                classNames="stateOption"
                mountOnEnter
                unmountOnExit
            >
                <SetOptions
                    replaceOption={replaceOption}
                    openEditThemeModal={openEditThemeModal}
                    setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
                    isSelectOpen={isSelectOpen}
                    setIsSelectOpen={setIsSelectOpen}
                />

            </CSSTransition>
        </div>
    );
});
export default MySelect;