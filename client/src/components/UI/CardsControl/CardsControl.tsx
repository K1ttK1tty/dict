import { FC, useState, useRef, memo } from 'react';
import { isMobile } from 'react-device-detect';
// components
import MySelect from '../MySelect/MySelect';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import CardsInfo from '../CardsInfo/CardsInfo';
// functions
import { modalAddCard } from '../../../functions/modalAddCard';
// styles
import styles from './CardsControl.module.css';
// icon
import PinIcon from './Icons/PinIcon';
// redux
import { useAppDispatch } from '../../../hooks/redux';
// types
interface ICardsControl {
    btnStyle: CSSModuleClasses;
    modalAdd: React.MutableRefObject<HTMLInputElement | null>;
    isAttached: boolean;
    setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
}
const CardsControl: FC<ICardsControl> = memo(function ({ btnStyle, modalAdd, isAttached, setIsAttached }) {
    const dispatch = useAppDispatch();

    const windowBlock = useRef<HTMLDivElement | null>(null);
    const [isCanMove, setIsCanMove] = useState<boolean>(false);
    const grabCursor: string = isCanMove
        ? [styles.wrapperGrab, styles.wrapper].join(' ')
        : styles.wrapper;
    const attachedMenuStyles = isMobile
        ? {}
        : { top: '80px', left: '0px' };
    const mouseStay = () => {
        document.onmousemove = null;
        document.body.className = '';
    };
    const mouseMove = (element: MouseEvent, shiftY: number, shiftX: number) => {
        if (windowBlock.current) {
            const windowElement = windowBlock.current;
            windowElement.style.top = element.pageY - shiftY + 'px';
            windowElement.style.left = element.pageX - shiftX + 'px';
        }
    };
    const move = (element: React.MouseEvent) => {
        if (!isCanMove || !windowBlock.current) {
            return;
        }
        const coordinates = getCoordinates(windowBlock.current);
        const shiftY: number = element.pageY - coordinates.top;
        const shiftX: number = element.pageX - coordinates.left;
        document.onmousemove = (elem) => {
            mouseMove(elem, shiftY, shiftX);
        };
        document.body.className = styles.noselect;
    };
    const getCoordinates = (element: HTMLDivElement) => {
        const coordinatesObj = element.getBoundingClientRect();
        return {
            top: coordinatesObj.top + window.scrollY,
            left: coordinatesObj.left + window.scrollX
        };
    };
    if (isAttached) {
        return (
            <div style={attachedMenuStyles} className={[styles.cardsOptions, 'CardsControl'].join(' ')}>
                {!isMobile && <PinIcon setIsAttached={setIsAttached} styles={styles.pinIcon} />}
                <button
                    onClick={() => modalAddCard(modalAdd, dispatch)}
                    className={styles.plus}
                >+</button>
                <BtnAddCard
                    onClick={() => modalAddCard(modalAdd, dispatch)}
                    dinamicclassname={btnStyle.btnCreateCard}
                    children="Создать карточку"
                />
                <MySelect />
            </div>
        );
    }
    return (
        <div
            ref={windowBlock}
            onMouseDown={element => move(element)}
            onMouseUp={mouseStay}
            className={grabCursor}
        >
            <div className={styles.title}>
                <PinIcon setIsAttached={setIsAttached} styles={[styles.pinIcon, styles.pinIconMarginRight].join(' ')} />
                <h2>Управление</h2>
            </div>
            <CardsInfo isMovedBlock={true} />
            <div className={styles.cardsOptionsMoved}>
                <BtnAddCard
                    onClick={isCanMove ? undefined : () => modalAddCard(modalAdd, dispatch)}
                    dinamicclassname={[btnStyle.btnCreateCard, btnStyle.btnMoved].join(' ')}
                    children="Создать карточку"
                />
                <MySelect isCanMove={isCanMove} />
            </div>
            <BtnAddCard
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                onClick={() => setIsCanMove(prev => !prev)}
                dinamicclassname={styles.buttonChangePosition}
                children={isCanMove ? 'Закрепить' : 'Переместить'}
            />
        </div>
    );
});
export default CardsControl;