import React from 'react';
import cl from './MenuDesk.module.css'
import Icon1 from './Icon1';
import Icon2 from './Icon2';
import Icon3 from './Icon3';
import Icon4 from './Icon4';
import { Link } from 'react-router-dom';
const MenuDesk = function ({ changeTheme }) {
    return (
        <nav>
            <div className={cl.back}>
                <div className={cl.content}>
                    <ul className={cl.ulMmenu}>
                        <li className={cl.ulMenu__item}>
                            <span className={cl.spanIcons}>
                                <Link to="/posts">
                                    <Icon2 className={cl.colorIcon} /><span className={cl.swipe}>Словарь</span>
                                </Link>
                            </span>
                        </li>

                        <li className={cl.ulMenu__item}>
                            <span className={cl.spanIcons}>
                                <Link to="/games">
                                    <Icon1 className={cl.colorIcon} /><span className={cl.swipe}>Мини игры</span>
                                </Link>
                            </span>
                        </li>
                        {/* <li className={cl.ulMenu__item}>
                            <span className={cl.spanIcons}>
                                <Link to="/settings" ><Icon3 className={cl.colorIcon} /><span className={cl.swipe}>Настройки</span></Link>
                            </span>
                        </li> */}
                    </ul>
                    <div className='themeChanger'>
                        <input defaultChecked={false} onClick={changeTheme} id='checkbox' type="checkbox" />
                        <label className='checkboxLabel' htmlFor="checkbox"></label>
                        <p className={cl.changeThemeTitle}>Change theme</p>
                    </div>




                    {/* <a className={cl.callBack}>
                        <span className={cl.callBackItem}><Icon4 fill={cl.questIcon} icon4Class={cl.icon4Class} /><span className={cl.callBackSpan}>Возникли вопросы?<p>Пиши нам!</p></span></span>
                    </a> */}


                </div>
            </div>
        </nav>
    )
};



export default MenuDesk;