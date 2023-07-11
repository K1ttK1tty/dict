import { FC, useState, useEffect, useRef, memo } from 'react';
import { debounce } from '../../../functions/debounce';
import style from './ScrollToTop.module.css';
const ScrollToTop: FC = memo(function () {
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>(0);
    const arrow = useRef<HTMLButtonElement | null>(null);
    let showArrow = false;
    
    const addActiveClassName = () => {
        showArrow = document.body.scrollTop > window.innerHeight * 0.6;
        const styles = showArrow
        ? [style.arrowWrapper, style.arrowActive].join(' ')
        : style.arrowWrapper;
        if (arrow.current) {
            arrow.current.className = styles;
        }
    };
    const callback = () => {
        debounce(timeoutId, setTimeoutId, addActiveClassName, 400);
    };
    
    useEffect(() => {
        document.body.addEventListener('scroll', callback);
        return () => {
            document.body.removeEventListener('scroll', callback);
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