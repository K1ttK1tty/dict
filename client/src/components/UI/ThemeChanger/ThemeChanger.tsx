import { FC, memo } from 'react';

import { changeTheme } from '../../../functions/changeTheme';

import styles from './ThemeChanger.module.css';

const ThemeChanger: FC = memo(function () {
    const theme = localStorage.getItem('theme');
    return (
        <div className={styles.themeChanger}>
            <input
                defaultChecked={theme !== 'light'}
                onClick={elem => changeTheme(elem)}
                id={styles.checkbox}
                type="checkbox"
            />
            <label className={styles.checkboxLabel} htmlFor={styles.checkbox}></label>
        </div>
    );
});
export default ThemeChanger;

