import { FC, memo } from 'react';
// components
import InputSearch from '../InputSearch/InputSearch';
// icon
import Search from '../../../pages/Icons/Search';
// functions
import { inputSearchHandler } from '../../../functions/inputSearchHandler';
// redux
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
const SearchItem: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { input } = useAppSelector(state => state.upMenu);
    return (
        <div className="menu__search" onMouseDown={e => inputSearchHandler(e, input, dispatch)}>
            <InputSearch />
            <Search />
        </div>
    );
});
export default SearchItem;