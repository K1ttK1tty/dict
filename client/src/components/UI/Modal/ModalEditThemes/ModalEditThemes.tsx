import { FC, memo } from 'react';
// components
import ModalEditThemesContent from './ModalEditThemesContent';
import Modal from '../Modal';
// styles
import style from './ModalEditThemes.module.css';
import { IModalEditThemes } from '../ModalsModels';
const ModalEditThemes: FC<IModalEditThemes> = memo(function ({ isOpenModal, setIsModal }) {

    return (
        <Modal
            title={'Изменить тему'}
            isModal={isOpenModal}
            setModal={setIsModal}
            dinamicClassName={style.modalEditThemes}
            content={<ModalEditThemesContent setIsModal={setIsModal} />}
        />
    );
});
export default ModalEditThemes;