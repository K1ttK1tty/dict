import React, { memo } from 'react';
import styles from './UI/MySelect/MySelect.module.css'
import { useSelector } from 'react-redux';
const SetOptions = memo(function ({ replaceOption }) {
    const selectOptions = useSelector(state => state.AuthSlice.selectOptions)
    return (
        <div id='options' className={styles.options}>
            {selectOptions.map((option, id) =>
                <div onClick={replaceOption} className={styles.optionsOption} key={option + id}>
                    {option}
                </div>)}
        </div>
    )
});
export default SetOptions;