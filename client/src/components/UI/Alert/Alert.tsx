import { useState, useEffect, memo, FC } from 'react';
// styles
import styles from './Alert.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setServerMessage } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const Alert: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { serverMessage } = useAppSelector(state => state.AuthSlice);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const messageStyle = isOpen ? [styles.message, styles.show].join(' ') : styles.message;
    const wrapperStyles = isOpen ? styles.wrapper : [styles.wrapper, styles.hide].join(' ');

    useEffect(() => {
        if (serverMessage) {
            setIsOpen(true);
            setTimeout(() => {
                close();
            }, 3000);
        }
    }, [serverMessage]);

    const close = () => {
        setIsOpen(false);
        setTimeout(() => {
            dispatch(setServerMessage());
        }, 350);
    };

    return (
        <div className={wrapperStyles}>
            <div onClick={close} className={messageStyle}>
                <p className={styles.text}>{serverMessage}</p>
            </div>
        </div>
    );
});
export default Alert;