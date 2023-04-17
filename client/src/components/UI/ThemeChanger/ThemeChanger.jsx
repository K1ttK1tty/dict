import React from 'react';
// styles
import styles from './ThemeChanger.module.css'
// redux
import { setPageTheme } from '../../../store/reducers/ColorPicker';
import { useDispatch } from 'react-redux';
const ThemeChanger = function () {
    const dispatch = useDispatch()
    function changeTheme(elem) {
        elem.target.checked ? dispatch(setPageTheme('dark')) : dispatch(setPageTheme('light'))
    }
    return (
        <div className={styles.themeChanger}>
            <input defaultChecked={false} onClick={changeTheme} id={styles.checkbox} type="checkbox" />
            <label className={styles.checkboxLabel} htmlFor={styles.checkbox}></label>
        </div>
    )
};
export default ThemeChanger;