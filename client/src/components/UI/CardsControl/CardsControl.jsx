import React, { useState, useRef } from 'react';
// components
import MySelect from '../MySelect/MySelect';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// functions
import { modalAddCard } from '../../../functions/modalAddCard';

// styles
import styles from './CardsControl.module.css'
// icon
import PinIcon from './Icons/PinIcon';
// redux
import { useDispatch } from 'react-redux';
const CardsControl = function ({ btnstyles, modalAdd }) {
    const dispatch = useDispatch();

    const windowBlock = useRef();
    const [isCanMove, setIsCanMove] = useState(false);
    const [isAttached, setIsAttached] = useState(true);
    const grabCursor = isCanMove
        ? [styles.wrapperGrab, styles.wrapper].join(' ')
        : styles.wrapper

    const mouseStay = () => {
        document.onmousemove = null;
        document.body.className = '';
    }
    const mouseMove = (element, shiftY, shiftX) => {
        const windowElement = windowBlock.current;
        windowElement.style.top = element.pageY - shiftY + 'px'
        windowElement.style.left = element.pageX - shiftX + 'px'
    }

    const move = (element) => {
        if (!isCanMove) {
            return false
        }

        const coordinates = getCoordinates(windowBlock.current);
        const shiftY = element.pageY - coordinates.top;
        const shiftX = element.pageX - coordinates.left;

        document.onmousemove = (element) => {
            mouseMove(element, shiftY, shiftX);
        }
        document.body.className = styles.noselect;
    }
    const getCoordinates = (element) => {
        const coordinatesObj = element.getBoundingClientRect();
        return {
            top: coordinatesObj.top + window.scrollY,
            left: coordinatesObj.left + window.scrollX
        }
    }
    if (isAttached) {
        return (
            <div className={styles.cardsOptions}>
                <div className={styles.plus}>+</div>
                {/* <BtnAddCard
                    onClick={() => modalAddCard(modalAdd, dispatch)}
                    dinamicclassname={btnstyles}
                    children='Создать карточку'
                /> */}
                <MySelect />
            </div>

        )
    }

    return (
        <div
            ref={windowBlock}
            onMouseDown={element => move(element)}
            onMouseUp={mouseStay}
            className={grabCursor}
        >
            <div className={styles.title}>
                <h2>Управление карточками</h2>
                <PinIcon setIsAttached={setIsAttached} styles={styles.pinIcon} />
            </div>

            <div className={styles.cardsOptions}>
                <BtnAddCard
                    onClick={() => modalAddCard(modalAdd, dispatch)}
                    dinamicclassname={btnstyles}
                    children='Создать карточку'
                />
                <MySelect />
            </div>
            <BtnAddCard
                onMouseDown={e => e.preventDefault()}
                onClick={() => setIsCanMove(prev => !prev)}
                dinamicclassname={styles.buttonChangePosition}
                children={isCanMove ? 'Закрепить' : 'Переместить'}
            />
        </div>
    )
};
export default CardsControl;