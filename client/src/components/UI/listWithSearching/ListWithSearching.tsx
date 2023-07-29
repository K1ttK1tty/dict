import { FC, memo, useState } from 'react';

import { debounce } from '../../../functions/debounce';

import style from '../Modal/ModalEditThemes/ModalEditThemes.module.css';
import listStyles from '../MySelect/MySelect.module.css';

import { IListWithSearching } from './ListWithSearchingModels';

import InputAddCard from '../InputAddCard/InputAddCard';

const ListWithSearching: FC<IListWithSearching> = memo(function ({
    inputSearchThemes,
    word,
    setWord,
    array,
    setClearInput,
    onItemClick,
    dinamicClassName,
}) {
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>(0);
    const search = (e: string) => {
        debounce(timeoutId, setTimeoutId, () => setWord(e), 400);
    };
    const closeButtonStyle = word ? style.closeButton : style.closeButtonHide;

    const themeClassName = [listStyles.optionsOption, style.theme].join(' ');
    return (
        <div className={style.content + ` ${dinamicClassName}`}>
            <InputAddCard
                modalAdd={inputSearchThemes}
                dinamicclassname={style.input}
                placeholder="Искать..."
                setDefaultTheme={e => search(e)}
                type="text"
            />
            <button id="close" onMouseDown={setClearInput} className={closeButtonStyle}>
                &times;
            </button>
            <div className={style.list}>
                {array.length ? (
                    array.map((option, id) => (
                        <div className={themeClassName} key={option + id + 'key'} onMouseDown={onItemClick}>
                            {option}
                        </div>
                    ))
                ) : (
                    <div>Тут ничего нет...</div>
                )}
            </div>
        </div>
    );
});
export default ListWithSearching;
