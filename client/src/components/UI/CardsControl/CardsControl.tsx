import { FC, useState, useRef, memo } from 'react';
import { isMobile } from 'react-device-detect';
// components
import MySelect from '../MySelect/MySelect';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import CardsInfo from '../CardsInfo/CardsInfo';
// functions
import { modalAddCard } from '../../../functions/modalAddCard';
import { mouseStay, move } from './CardsControlFunctions';
// styles
import styles from './CardsControl.module.css';
import btnStyle from '../Modal/ModalAddCards/FormAddCard.module.css';
// icon
import PinIcon from './Icons/PinIcon';
// redux
import { useAppDispatch } from '../../../hooks/redux';
// types
import { ICardsControl } from './CardsControlModel';
const CardsControl: FC<ICardsControl> = memo(function
    ({
        modalAdd,
        isAttached,
        setIsAttached,
        isTwoColumns,
        setIsTwoColumns,
        isOpenModal,
        setIsModal,
        wordsOrder,
        setWordsOrder
    }) {
    const dispatch = useAppDispatch();
    const windowBlock = useRef<HTMLDivElement | null>(null);
    const [isCanMove, setIsCanMove] = useState<boolean>(false);
    const grabCursor: string = isCanMove
        ? [styles.wrapperGrab, styles.wrapper].join(' ')
        : styles.wrapper;
    const attachedMenuStyles = isMobile
        ? {}
        : { top: '80px', left: '0px' };


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
                <MySelect
                    isOpenModal={isOpenModal}
                    setIsModal={setIsModal}
                />
            </div>
        );
    }
    return (
        <div
            ref={windowBlock}
            onMouseDown={element => move(element, windowBlock, isCanMove)}
            onMouseUp={mouseStay}
            className={grabCursor}
        >
            <div className={styles.title}>
                <PinIcon
                    setIsAttached={setIsAttached}
                    styles={[styles.pinIcon, styles.pinIconMarginRight].join(' ')}
                />
                <h2>Управление</h2>
            </div>
            <CardsInfo
                isMovedBlock={true}
                isTwoColumns={isTwoColumns}
                setIsTwoColumns={setIsTwoColumns}
                order={wordsOrder}
                setOrder={setWordsOrder}
            />
            <div className={styles.cardsOptionsMoved}>
                <BtnAddCard
                    onClick={isCanMove ? undefined : () => modalAddCard(modalAdd, dispatch)}
                    dinamicclassname={[btnStyle.btnCreateCard, btnStyle.btnMoved].join(' ')}
                    children="Создать карточку"
                />
                <MySelect
                    isOpenModal={isOpenModal}
                    setIsModal={setIsModal}
                    isCanMove={isCanMove} />
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