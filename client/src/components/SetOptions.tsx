import { FC, memo } from 'react';
// styles
import styles from './UI/MySelect/MySelect.module.css';
// redux
import { useAppSelector } from '../hooks/redux';
// types
import { ISetOptions } from '../models/models';
const SetOptions: FC<ISetOptions> = memo(function ({ replaceOption, setIsModal }) {
    const { selectOptions } = useAppSelector(state => state.AuthSlice);
    return (
        <div id="options" className={styles.options}>
            <div onMouseDown={e => e.stopPropagation()}>
                <div onMouseDown={() => setIsModal(true)} className={styles.optionsOption}>
                    Редактирование Тем
                </div>
            </div>
            <hr />
            {
                selectOptions.map((option, id) =>

                    <div onMouseDown={replaceOption} className={styles.optionsOption} key={option + id}>
                        {option}
                    </div>
                )
            }
        </div>
    );
});
export default SetOptions;