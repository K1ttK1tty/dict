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
// types
import { ICardsControl } from './CardsControlModel';
const CardsControl: FC<ICardsControl> = memo(function
    ({
        modalAdd,
        isAttached,
        setIsAttached,
        setIsModal,
        setIsAddCardModal,
        isSelectOpen,
        setIsSelectOpen,
        setSelectedColorOrNewLabel,
        selectedColorOrNewLabel,
        isColorsInCards
    }) {
    const windowBlock = useRef<HTMLDivElement | null>(null);
    const [isCanMove, setIsCanMove] = useState<boolean>(false);
    const grabCursor: string = isCanMove
        ? [styles.wrapperGrab, styles.wrapper].join(' ')
        : styles.wrapper;
    const attachedMenuStyles = isMobile
        ? {}
        : { top: '80px', left: '0px' };


    if (isAttached.attach) {
        return (
            <div style={attachedMenuStyles} className={[styles.cardsOptions, 'CardsControl'].join(' ')}>
                {!isMobile && <PinIcon isAttached={isAttached} setIsAttached={setIsAttached} styles={styles.pinIcon} />}
                <button
                    onClick={() => modalAddCard(modalAdd, setIsAddCardModal)}
                    className={styles.plus}
                >+</button>
                <BtnAddCard
                    onClick={() => modalAddCard(modalAdd, setIsAddCardModal)}
                    dinamicclassname={btnStyle.btnCreateCard}
                    children="Создать карточку"
                />
                <MySelect
                    setIsModal={setIsModal}
                    isSelectOpen={isSelectOpen}
                    setIsSelectOpen={setIsSelectOpen}
                    setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
                    selectedColorOrNewLabel={selectedColorOrNewLabel}
                    isColorsInCards={isColorsInCards}
                />
            </div>
        );
    }
    return (
        <div
            ref={windowBlock}
            onMouseDown={element => move(element, windowBlock, isCanMove, isAttached, setIsAttached)}
            onMouseUp={mouseStay}
            className={grabCursor}
            style={{ left: isAttached.left, top: isAttached.top }}
        >
            <div className={styles.title}>
                <PinIcon
                    isAttached={isAttached}
                    setIsAttached={setIsAttached}
                    styles={[styles.pinIcon, styles.pinIconMarginRight].join(' ')}
                />
                <h2>Управление</h2>
            </div>
            <CardsInfo
                isMovedBlock={true}
            />
            <div className={styles.cardsOptionsMoved}>
                <BtnAddCard
                    onClick={isCanMove ? undefined : () => modalAddCard(modalAdd, setIsAddCardModal)}
                    dinamicclassname={[btnStyle.btnCreateCard, btnStyle.btnMoved].join(' ')}
                    children="Создать карточку"
                />
                <MySelect
                    setIsModal={setIsModal}
                    isSelectOpen={isSelectOpen}
                    setIsSelectOpen={setIsSelectOpen}
                    setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
                    selectedColorOrNewLabel={selectedColorOrNewLabel}
                    isColorsInCards={isColorsInCards}
                />
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