import React, { useState, useEffect, memo } from 'react';
// styles
import styles from './Alert.module.css'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setServerMessage } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const Alert = memo(function () {
    const dispatch = useDispatch();
    const { serverMessage } = useSelector(state => state.AuthSlice);
    const [isOpen, setIsOpen] = useState(false)

    const messageStyle = isOpen ? [styles.message, styles.show].join(' ') : styles.message
    const wrapperStyles = isOpen ? styles.wrapper : [styles.wrapper, styles.hide].join(' ')
    
    useEffect(() => {
        if (serverMessage) {
            setIsOpen(true)
            setTimeout(() => {
                close()
            }, 3000);
        }
    }, [serverMessage]);

    const close = () => {
        setIsOpen(false)
        setTimeout(() => {
            dispatch(setServerMessage())
        }, 350);
    }

    return (
        <div className={wrapperStyles}>


            <div onClick={close} className={messageStyle}>
                <p className={styles.text}>{serverMessage}</p>
            </div>

        </div>
    )
});
export default Alert;