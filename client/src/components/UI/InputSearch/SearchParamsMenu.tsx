import { FC } from 'react';
//components
import Checkbox from '../Checkbox/Checkbox';
//style
import style from './InputSearch.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearchByWord, setIsLetterCaseInclude } from '../../../store/reducers/upMenu';
const SearchParamsMenu: FC = function () {
    const dispatch = useAppDispatch();
    const { isSearchByWord, isLetterCaseInclude } = useAppSelector(state => state.upMenu);
    const searchByWordClassName = isSearchByWord
        ? style.underline
        : '';
    const searchByTranslateClassName = isSearchByWord
        ? ''
        : style.underline;
    return (
        <div className={style.searchParamsMenu} onMouseDown={e => e.stopPropagation()}>
            <h3 className={style.mb14}>Параметры поиска</h3>
            <div className={style.mb6}>
                Поиск по <span className={searchByWordClassName}>слову</span>/
                <span className={searchByTranslateClassName}>переводу</span>:
                <Checkbox
                    id={'searchByWordOrTranslateID'}
                    defaultChecked={isSearchByWord}
                    dinamicClassName={style.input}
                    callback={() => dispatch(setSearchByWord())}
                />
            </div>
            <div>Учитывать регистр:
                <Checkbox
                    id={'includeLetterCaseID'}
                    defaultChecked={isLetterCaseInclude}
                    dinamicClassName={style.input}
                    callback={() => dispatch(setIsLetterCaseInclude())}
                />
            </div>
        </div>
    );
};
export default SearchParamsMenu;