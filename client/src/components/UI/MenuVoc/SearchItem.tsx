import { FC, memo } from 'react';

import { inputSearchHandler } from '../../../functions/inputSearchHandler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import Search from '../../../pages/Icons/Search';
import InputSearch from '../InputSearch/InputSearch';

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
