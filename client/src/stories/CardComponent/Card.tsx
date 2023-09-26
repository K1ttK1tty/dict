import Card from '../../components/UI/WordCard/Card';
import styles from '../../components/UI/WordCard/WordCard.module.css';

import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 9;
export const CardNewUI = () => {
    return WrapInProviderAndRouter(
        <div className={styles.cardForStorybook}>
            <Card
                modalChangeCard={y}
                card={{
                    word: 'RedWord',
                    translate: 'RedTranslate',
                    theme: 'theme',
                    time: Date.now(),
                    color: 'red',
                    id: 1,
                    note: 'notenote note note note note note',
                    favorite: true,
                }}
                index={1}
                setIsEditCardModal={y}
                selectedColorOrNewLabel={y}
            />
        </div>,
    );
};
export const CardGreenUI = () => {
    return WrapInProviderAndRouter(
        <div className={styles.cardForStorybook}>
            <Card
                modalChangeCard={y}
                card={{
                    word: 'GreenWord',
                    translate: 'GreenTranslate',
                    theme: 'theme',
                    time: 123,
                    color: 'green',
                    id: 1,
                    note: 'notenote note note note note note',
                    favorite: false,
                }}
                index={1}
                setIsEditCardModal={y}
                selectedColorOrNewLabel={y}
            />
        </div>,
    );
};
