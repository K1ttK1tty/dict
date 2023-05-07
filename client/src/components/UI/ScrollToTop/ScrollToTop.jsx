import React, { useEffect } from 'react';
// styles
import style from './ScrollToTop.module.css'
const ScrollToTop = function () {

    useEffect(() => {

        return () => {

        };
    }, []);

    const onScroll = () => {
        console.log(document.body.scrollTop)
    }

    return (
        <button onScroll={onScroll} className={style.arrowWrapper}>
            <div className={style.icon}>
                <div className={style.arrow}></div>
            </div>
        </button>
    )
};
export default ScrollToTop;