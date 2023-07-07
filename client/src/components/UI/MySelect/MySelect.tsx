// libs
import { FC, useRef, useEffect, memo } from 'react';
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
import {
    setOptionName,
    setOptionState,
    setChooseTheme
} from '../../../store/reducers/authorization/Authorization/AuthSlice';
// types
import { IMySelect } from './MySelectModel';
const MySelect: FC<IMySelect> = memo(function ({ isCanMove, isOpenModal, setIsModal }) {
    const dispatch = useAppDispatch();
    const { optionName, optionState } = useAppSelector(state => state.AuthSlice);
    const selectElement = useRef<HTMLDivElement | null>(null);
    const isCanMoveFunction = isCanMove
        ? undefined :
        () => dispatch(setOptionState({ ...optionState, open: !optionState.open }));

    function replaceOption(element: React.MouseEvent<HTMLDivElement>) {
        const divElement = element.target as HTMLDivElement;
        dispatch(setOptionName(divElement.innerText));
        dispatch(setChooseTheme(divElement.innerText));
        dispatch(setOptionState({ open: false, removeMark: true }));
    }
    function removeTheme() {
        dispatch(setOptionName('Тема'));
        dispatch(setChooseTheme(''));
        dispatch(setOptionState({ open: false, removeMark: false }));
    }
    if (optionState.open) {
        setTimeout(() => {
            if (selectElement.current) {
                selectElement.current.focus();
            }
        }, 200);
    }
    useEffect(() => {
        if (optionName !== 'Тема') {
            dispatch(setOptionState({ ...optionState, removeMark: true }));
        } else {
            dispatch(setOptionState({ ...optionState, removeMark: false }));
        }
        return () => {
            dispatch(setOptionState({ ...optionState, open: false }));
        };
    }, []);
    useEffect(() => {
        if (isOpenModal) dispatch(setOptionState({ ...optionState, open: false }));
    }, [isOpenModal, dispatch, optionState]);
    return (
        <div
            className={styles.select}
            ref={selectElement}
            onKeyDown={() => dispatch(setOptionState({ ...optionState, open: false }))}
            tabIndex={0}
        >
            <div
                onMouseDown={isCanMoveFunction}
                className={[styles.title, 'ifNotThisThenClose'].join(' ')}
            >
                <div
                    onMouseDown={isCanMoveFunction}
                    className={[styles.selectValue, 'ifNotThisThenClose'].join(' ')}
                >
                    {cutLongLine(optionName, 11)}
                </div>
                <div className={styles.selectIcon}><IconSelect /></div>
            </div>
            {
                optionState.removeMark &&
                <button id="close" onClick={removeTheme} className={styles.removeTheme}>&times;</button>
            }
            <CSSTransition
                in={optionState.open}
                timeout={180}
                classNames="stateOption"
                mountOnEnter
                unmountOnExit
            >
                <SetOptions
                    replaceOption={replaceOption}
                    setIsModal={setIsModal}
                />

            </CSSTransition>
        </div>
    );
});
export default MySelect;