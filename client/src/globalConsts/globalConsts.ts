import styles from '../components/UI/WordCard/WordCard.module.css';
export const colours = new Map();
colours.set('green', styles.green);
colours.set('red', styles.red);
colours.set('orange', styles.orange);
const weekSec = 1000 * 60 * 60 * 24; // now is 24 hours
export const isNewLabel = (time: number) => {
    return Date.now() - time <= weekSec;
};
