import { FC, memo } from 'react';
// components
import ModalEditThemesContent from './ModalEditThemesContent';
import Modal from '../Modal';
// styles
import style from './ModalEditThemes.module.css';
import { IModalEditThemes } from '../ModalsModels';
const ModalEditThemes: FC<IModalEditThemes> = memo(function ({ isEditThemesModal, setIsEditThemesModal }) {
    return (
        <Modal
            title={'Изменить тему'}
            isModal={isEditThemesModal}
            setModal={setIsEditThemesModal}
            dinamicClassName={style.modalEditThemes}
            content={
                <ModalEditThemesContent
                    setIsEditThemesModal={setIsEditThemesModal}
                    isEditThemesModal={isEditThemesModal}
                />}
        />
    );
});
export default ModalEditThemes;