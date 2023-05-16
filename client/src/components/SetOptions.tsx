import { FC, memo } from 'react';
import styles from './UI/MySelect/MySelect.module.css';
import { useAppSelector } from '../hooks/redux';
// types
interface ISetOptions {
    replaceOption: (element: React.MouseEvent<HTMLDivElement>) => void;
}
const SetOptions: FC<ISetOptions> = memo(function ({ replaceOption }) {
    const selectOptions = useAppSelector(state => state.AuthSlice.selectOptions);
    return (
        <div id="options" className={styles.options}>
            {
                selectOptions.map((option, id) =>
                    <div onClick={replaceOption} className={styles.optionsOption} key={option + id}>
                        {option}
                    </div>
                )
            }
        </div>
    );
});
export default SetOptions;