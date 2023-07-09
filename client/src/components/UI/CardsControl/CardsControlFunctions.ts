import { TMouseMove, TMove } from './CardsControlModel';
import styles from './CardsControl.module.css';
export const mouseStay = () => { // get out
    document.onmousemove = null;
    document.body.className = '';
};
export const mouseMove: TMouseMove = (element, shiftY, shiftX, windowBlock) => { // get out
    if (windowBlock?.current) {
        const windowElement = windowBlock?.current;
        windowElement.style.top = element.pageY - shiftY + 'px';
        windowElement.style.left = element.pageX - shiftX + 'px';
    }
};

export const move: TMove = (element, windowBlock, isCanMove) => { // get out
    if (windowBlock) {
        if (!isCanMove || !windowBlock.current) {
            return;
        }
        const coordinates = getCoordinates(windowBlock.current);
        const shiftY: number = element.pageY - coordinates.top;
        const shiftX: number = element.pageX - coordinates.left;
        document.onmousemove = (elem) => {
            mouseMove(elem, shiftY, shiftX, windowBlock);
        };
        document.body.className = styles.noselect;
    }
};
export const getCoordinates = (element: HTMLDivElement) => { // get out
    const coordinatesObj = element.getBoundingClientRect();
    return {
        top: coordinatesObj.top + window.scrollY,
        left: coordinatesObj.left + window.scrollX
    };
};