import { useState, useCallback, memo, FC } from 'react';
// functions 
import { isNotEmpty } from '../../../functions/isNotEmpty';
// styles
import styles from './Alert.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setServerMessage } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const Alert: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { serverMessage } = useAppSelector(state => state.AuthSlice);
    const close = useCallback(() => {
        setTimeout(() => {
            dispatch(setServerMessage(''));
        }, 2600);
    }, [dispatch]);
    const instantClose = () => {
        dispatch(setServerMessage(''));
    };
    const [message, setMessage] = useState<string>('');
    if (message !== serverMessage && isNotEmpty(serverMessage)) {
        setMessage(serverMessage);
    }
    if (isNotEmpty(serverMessage)) {
        close();
    }
    const messageStyle = serverMessage
        ? [styles.message, styles.show].join(' ')
        : styles.message;
    const wrapperStyles = serverMessage
        ? styles.wrapper
        : [styles.wrapper, styles.hide].join(' ');

    return (
        <div className={wrapperStyles}>
            <div onClick={instantClose} className={messageStyle}>
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    );
});
export default Alert;