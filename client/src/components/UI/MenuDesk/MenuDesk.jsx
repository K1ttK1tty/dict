// libs
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
// components
import AvatarWithInfo from '../Avatar/AvatarWithInfo';
// icons
import Icon1 from './icons/Icon1';
import Icon2 from './icons/Icon2';
// import Icon3 from './icons/Icon3';
// import Icon4 from './icons/Icon4';
// styles
import cl from './MenuDesk.module.css';
const MenuDesk = memo(function () {
    const [menuOpen, setMenuOpen] = useState(false);
    const isMenuOpen = menuOpen ? [cl.back, cl.menuOpen].join(' ') : cl.back;

    useEffect(() => {
        const page = document.querySelector('.pageContent');
        if (menuOpen) page.style.transform = 'translateX(225px)';
        else page.style.transform = 'translateX(0px)';

    }, [menuOpen]);
    const closeMenu = (e) => {
        e.stopPropagation();
        if (e.target.className === isMenuOpen) {
            setMenuOpen(false);
        }
    }

    return (
        <nav onClick={closeMenu} >
            <div onClick={() => setMenuOpen(true)} className={isMenuOpen}>
                <div className={cl.content}>
                    <AvatarWithInfo
                        isMenuOpen={menuOpen}
                        setFunction={() => setMenuOpen(prev => !prev)}
                    />
                    <ul className={cl.ulMmenu}>
                        <li className={cl.ulMenu__item}>
                            <span onClick={e => e.stopPropagation()} className={cl.spanIcons}>
                                <Link onClick={() => setMenuOpen(false)} to="/posts">
                                    <Icon2 className={cl.colorIcon} />
                                    <span className={cl.swipe}>Словарь</span>
                                </Link>
                            </span>
                        </li>

                        <li className={cl.ulMenu__item}>
                            <span onClick={e => e.stopPropagation()} className={cl.spanIcons}>
                                <Link onClick={() => setMenuOpen(false)} to="/games">
                                    <Icon1 className={cl.colorIcon} />
                                    <span className={cl.swipe}>Мини игры</span>
                                </Link>
                            </span>
                        </li>
                        {/* <li className={cl.ulMenu__item}>
                            <span className={cl.spanIcons}>
                                <Link to="/settings" >
                                <Icon3 className={cl.colorIcon} />
                                <span className={cl.swipe}>Настройки</span></Link>
                            </span>
                        </li> */}
                    </ul>

                    {/* <a className={cl.callBack}>
                        <span className={cl.callBackItem}>
                        <Icon4 fill={cl.questIcon} icon4Class={cl.icon4Class} />
                        <span className={cl.callBackSpan}>Возникли вопросы?<p>Пиши нам!</p>
                        </span></span>
                    </a> */}
                </div>
            </div>
        </nav>
    )
});
export default MenuDesk;