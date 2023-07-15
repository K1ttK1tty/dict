import { TMouseMove, TMove } from './CardsControlModel';
import styles from './CardsControl.module.css';
export const mouseStay = () => {
    document.onmousemove = null;
    document.body.className = '';
};
const mouseMove: TMouseMove = (element, shiftY, shiftX, windowBlock, isAttached, setIsAttached) => {
    if (windowBlock?.current) {
        const windowElement = windowBlock?.current;
        const topPosition = element.pageY - shiftY + 'px';
        const leftPosition = element.pageX - shiftX + 'px';
        windowElement.style.top = topPosition;
        windowElement.style.left = leftPosition;
        setIsAttached({ ...isAttached, top: topPosition, left: leftPosition });
    }
};
// isAttached, setIsAttached
export const move: TMove = (element, windowBlock, isCanMove, isAttached, setIsAttached) => {
    if (windowBlock) {
        if (!isCanMove || !windowBlock.current) {
            return;
        }
        const coordinates = getCoordinates(windowBlock.current);
        const shiftY: number = element.pageY - coordinates.top;
        const shiftX: number = element.pageX - coordinates.left;
        document.onmousemove = (elem) => {
            mouseMove(elem, shiftY, shiftX, windowBlock, isAttached, setIsAttached);
        };
        document.body.className = styles.noselect;
    }
};
export const getCoordinates = (element: HTMLDivElement) => {
    const coordinatesObj = element.getBoundingClientRect();
    return {
        top: coordinatesObj.top + window.scrollY,
        left: coordinatesObj.left + window.scrollX
    };
};