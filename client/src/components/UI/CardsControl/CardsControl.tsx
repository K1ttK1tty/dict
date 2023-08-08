import { FC, memo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { modalAddCard } from '../../../functions/modalAddCard';

import btnStyle from '../Modal/ModalAddCards/FormAddCard.module.css';
import styles from './CardsControl.module.css';

import { ICardsControl } from './CardsControlModel';

import BtnAddCard from '../BtnAddCard/BtnAddCard';
import CardsInfo from '../CardsInfo/CardsInfo';
import MySelect from '../MySelect/MySelect';
import { mouseStay, move } from './CardsControlFunctions';
import PinIcon from './Icons/PinIcon';

const CardsControl: FC<ICardsControl> = memo(function ({
    modalAdd,
    isAttached,
    setIsAttached,
    setIsModal,
    setIsAddCardModal,
    isSelectOpen,
    setIsSelectOpen,
    setSelectedColorOrNewLabel,
    selectedColorOrNewLabel,
    setIsDictionaryModal,
}) {
    const windowBlock = useRef<HTMLDivElement | null>(null);
    const [isCanMove, setIsCanMove] = useState<boolean>(false);
    const grabCursor: string = isCanMove ? [styles.wrapperGrab, styles.wrapper].join(' ') : styles.wrapper;
    const attachedMenuStyles = isMobile ? {} : { top: '80px', left: '0px' };

    if (isAttached.attach) {
        return (
            <div
                data-testid="attachedCardsControl"
                style={attachedMenuStyles}
                className={[styles.cardsOptions, 'CardsControl'].join(' ')}
            >
                {!isMobile && <PinIcon isAttached={isAttached} setIsAttached={setIsAttached} styles={styles.pinIcon} />}
                <button
                    data-testid="addCardButton"
                    onClick={() => modalAddCard(modalAdd, setIsAddCardModal)}
                    className={styles.plus}
                >
                    +
                </button>
                <BtnAddCard
                    data-testid="addCardButton"
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
                />
            </div>
        );
    }
    return (
        <div
            data-testid="notAttachedCardsControl"
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
            <CardsInfo isMovedBlock={true} setIsDictionaryModal={setIsDictionaryModal} />
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
