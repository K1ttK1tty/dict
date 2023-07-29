import { FC, memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import styles from './UserMenu.module.css';

import { activateMail } from '../../../store/reducers/authorization/Authorization/ActionCreator';

import { IInfo } from './UserMenuModel';

import BtnAddCard from '../BtnAddCard/BtnAddCard';
import Question from './Icons/Question';

const Info: FC<IInfo> = memo(function ({ isUserMenuOpen }) {
    const dispatch = useAppDispatch();
    const { id, email } = useAppSelector(state => state.AuthSlice.user);
    const [isOpen, setIsOpen] = useState<boolean>(isUserMenuOpen);
    if (isUserMenuOpen !== isOpen && !isUserMenuOpen) setIsOpen(false);
    const submenuStyles = isOpen ? [styles.show, styles.submenu].join(' ') : styles.submenu;

    return (
        <div className={styles.infoWrapper}>
            <Question setIsOpen={setIsOpen} style={styles.icon} />
            <div className={submenuStyles}>
                <p>При регистрации вам было отправлено письмо об активации аккаунта.</p>
                <BtnAddCard
                    children={'Отправить повторно'}
                    aria={'Отправить повторно'}
                    dinamicclassname={styles.btnExit}
                    onClick={() => dispatch(activateMail({ id, email }))}
                />
            </div>
        </div>
    );
});
export default Info;
