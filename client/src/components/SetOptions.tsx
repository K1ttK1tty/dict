import { FC, memo } from 'react';
// styles
import styles from './UI/MySelect/MySelect.module.css';
// redux
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

                    <div onMouseDown={replaceOption} className={styles.optionsOption} key={option + id}>
                        {option}
                    </div>
                )
            }
        </div>
    );
});
export default SetOptions;