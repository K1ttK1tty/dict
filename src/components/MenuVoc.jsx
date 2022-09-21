import React from 'react';
import InputSearch from './UI/InputSearch/InputSearch';
import Search from '../pages/Icons/Search';
const MenuVoc = function ({ input, setInput, searchWord, setSearchWord, ...props }) {

    function clearINput() {
        setSearchWord('');
    }

    function inputOn(event) {

        if (event.target.id == 1) {
            return false
        }
        
        if (!input.before) {
            setInput({
                before: true,
                after: input.after,
            });
        } else {
            setInput({
                before: false,
                after: input.after,
            });
            clearINput();
        }
    }


    return (
        <div className="menu">
            <div className='menu__container'>
                <div className="menu__logo">Logo</div>
                <div className="menu__search" onClick={inputOn}><InputSearch input={input} searchWord={searchWord} setSearchWord={setSearchWord} placeholder={' Search word'} /><Search stroke={'black'} height={'22px'} width={'22px'} /></div>
            </div>
        </div>
    )
};
export default MenuVoc;