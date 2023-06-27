import { FC, useEffect, useRef, memo } from 'react';
// styles
import style from './ScrollToTop.module.css';
const ScrollToTop: FC = memo(function () {
    const arrow = useRef<HTMLButtonElement | null>(null);
    let showArrow = false;
    let scrollTimeOut: ReturnType<typeof setTimeout>;

    const addActiveClassName = () => {
        clearTimeout(scrollTimeOut);
        scrollTimeOut = setTimeout(() => {
            showArrow = document.body.scrollTop > window.innerHeight * 0.6;
            const styles = showArrow
                ? [style.arrowWrapper, style.arrowActive].join(' ')
                : style.arrowWrapper;
            if (arrow.current) {
                arrow.current.className = styles;
            }
        }, 200);
    };
    useEffect(() => {
        document.body.addEventListener('scroll', addActiveClassName);
        return () => {
            document.body.removeEventListener('scroll', addActiveClassName);
        };
    });
    return (
        <button
            ref={arrow}
            className={style.arrowWrapper}
            onClick={() => document.body.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <div className={style.icon}>
                <div className={style.arrow}></div>
            </div>
        </button>
    );
});
export default ScrollToTop;