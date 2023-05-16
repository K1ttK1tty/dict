import { FC, memo } from 'react';
// components
import Input from '../Input/Input';
// styles
import styles from '../CardRand/CardRand.module.css';
import '../../../styles/Games.css';
//redux
import { useAppSelector } from '../../../hooks/redux';
// types
import { ICards } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ICardRand {
    card: ICards;
    index: number;
}
const CardRand: FC<ICardRand> = memo(function ({ card, index }) {
    const { validateArr } = useAppSelector(state => state.GamesSlice);
    let validateWord = 'hidden';
    if (validateArr[index]) validateWord = validateArr[index] + 'Color';

    return (
        <div className={styles.cardRand}>
            <div className="wordBlock">
                <div className={['wordShared', validateWord].join(' ')}>{card.word}</div>
                <Input validClass={validateArr[index]} />
            </div>
            <div className={styles.translateRand}>{card.translate}</div>
        </div>
    );
});
export default CardRand;