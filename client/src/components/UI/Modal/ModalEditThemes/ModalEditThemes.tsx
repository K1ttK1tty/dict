import { FC, memo } from 'react';

import style from './ModalEditThemes.module.css';

import { IModalEditThemes } from '../ModalsModels';

import Modal from '../Modal';
import ModalEditThemesContent from './ModalEditThemesContent';

const ModalEditThemes: FC<IModalEditThemes> = memo(function ({ isEditThemesModal, setIsEditThemesModal }) {
    return (
        <Modal
            testid="modalEditThemes"
            title={'Изменить тему'}
            isModal={isEditThemesModal}
            setModal={setIsEditThemesModal}
            dinamicClassName={style.modalEditThemes}
            content={
                <ModalEditThemesContent
                    setIsEditThemesModal={setIsEditThemesModal}
                    isEditThemesModal={isEditThemesModal}
                />
            }
        />
    );
});
export default ModalEditThemes;
