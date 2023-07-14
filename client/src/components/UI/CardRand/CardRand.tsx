import { FC, memo } from 'react';
// components
import InputAddCard from '../InputAddCard/InputAddCard';
// styles
import styles from '../CardRand/CardRand.module.css';
import '../../../styles/Games.css';
//redux
import { useAppSelector } from '../../../hooks/redux';
// types
import { ICardRand } from './CardRandModel';
const CardRand: FC<ICardRand> = memo(function ({ card, index, testByWord }) {
    const { validateArr } = useAppSelector(state => state.GamesSlice);
    let validateWord = 'hidden';
    if (validateArr[index]) {
        validateWord = validateArr[index] + 'Color';
    }

    if (!testByWord) {
        return (
            <div className={styles.wrapper}>
                <div className="wordBlock">
                    <div className="word">Перевод: </div>
                    <div className={styles.translateRand}>{card.translate}</div>
                </div>
                <div className="translateBlock">
                    <InputAddCard
                        dinamicclassname={[styles.input, validateArr[index], 'inptReq '].join(' ')}
                    />
                    <div className={['wordShared', validateWord].join(' ')}>{card.word}</div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.wrapper}>
            <div className="wordBlock">
                <div className="word">Слово: </div>
                <div className={styles.translateRand}>{card.word}</div>
            </div>
            <div className="translateBlock">
                <InputAddCard
                    dinamicclassname={[styles.input, validateArr[index], 'inptReq '].join(' ')}
                />
                <div className={['wordShared', validateWord].join(' ')}>{card.translate}</div>
            </div>
        </div>
    );
});
export default CardRand;