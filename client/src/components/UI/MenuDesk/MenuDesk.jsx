// libs
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
// icons
import Icon1 from './icons/Icon1';
import Icon2 from './icons/Icon2';
// import Icon3 from './icons/Icon3';
// import Icon4 from './icons/Icon4';
// styles
import cl from './MenuDesk.module.css';
const MenuDesk = memo(function () {
    const [menuOpen, setMenuOpen] = useState(false);

    const isMenuOpen = menuOpen
        ? (isMobile ? [cl.back, cl.menuOpen].join(' ') : cl.back)
        : (isMobile ? cl.back : [cl.back, cl.canHover].join(' '));
    const showMenuCloseIcon = menuOpen
        ? [cl.removeMenuIconShow, cl.removeMenuIcon].join(' ')
        : cl.removeMenuIcon

    useEffect(() => {
        const page = document.querySelector('.pageContent');
        const CardsControl = document.querySelector('.CardsControl');
        if (menuOpen && CardsControl) {
            page.style.right = '-220px'
            CardsControl.classList.add(cl.rightCardsControl)
        }
        else if(CardsControl) {
            page.style.right = '0px'
            CardsControl.classList.remove(cl.rightCardsControl)
        }
    }, [menuOpen]);
    const openMenu = (e) => {
        e.stopPropagation();
        if (!menuOpen) setMenuOpen(true);
        else if (e.target.className === isMenuOpen) setMenuOpen(false);
    }
    const changePage = () => {
        const CardsControl = document.querySelector('.CardsControl');
        if (CardsControl) {
            const page = document.querySelector('.pageContent');
            page.style.right = '0px'
            CardsControl.classList.remove(cl.rightCardsControl)
        }
        setMenuOpen(false)
    }
    return (
        <nav onClick={isMobile ? openMenu : null} >
            <div className={isMenuOpen}>
                <div className={cl.content}>
                    {
                        isMobile &&
                        <button
                            className={showMenuCloseIcon}
                            onClick={() => setMenuOpen(false)}
                        >&times;</button>
                    }

                    <ul className={cl.ulMmenu}>
                        <li className={cl.ulMenu__item}>
                            <span onClick={e => e.stopPropagation()} className={cl.spanIcons}>
                                <Link className={cl.navigationLink} onClick={changePage} to="/posts">
                                    <Icon2 className={cl.colorIcon} />
                                    <div className={cl.swipe}>Словарь</div>
                                </Link>
                            </span>
                        </li>

                        <li className={cl.ulMenu__item}>
                            <span onClick={e => e.stopPropagation()} className={cl.spanIcons}>
                                <Link className={cl.navigationLink} onClick={changePage} to="/games">
                                    <Icon1 className={cl.colorIcon} />
                                    <div className={cl.swipe}>Мини игры</div>
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
        </nav >
    )
});
export default MenuDesk;