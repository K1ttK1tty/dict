import React, { memo } from 'react';
// functions
import { changeTheme } from '../../../functions/changeTheme';
// styles
import styles from './ThemeChanger.module.css'
const ThemeChanger = memo(function () {
    const theme = localStorage.getItem('theme')
    const isLightTheme = theme === 'light'
        ? false
        : true

    return (
        <div className={styles.themeChanger}>
            <input defaultChecked={isLightTheme} onClick={elem => changeTheme(elem)} id={styles.checkbox} type="checkbox" />
            <label className={styles.checkboxLabel} htmlFor={styles.checkbox}></label>
        </div>
    )
});
export default ThemeChanger;