import { FC, useRef, memo } from 'react';
// components
import BtnAddCard from '../../BtnAddCard/BtnAddCard';
import ChangeFileController from './ChangeFileController';
// styles
import styles from './AddAvatarContent.module.css';
// redux
import { useAppDispatch } from '../../../../hooks/redux';
import { RemoveAvatar } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import { setAvatar } from '../../../../store/reducers/authorization/Authorization/AuthSlice';
// types
import { IAddAvatarContent } from '../ModalsModels';
const AddAvatarContent: FC<IAddAvatarContent> = memo(function (
    {
        changeFile,
        files,
        upload,
        setFiles,
        email,
        setModal,
        isModal
    }) {
    const dispatch = useAppDispatch();
    const element = useRef<HTMLDivElement | null>(null);
    const removeAvatar = () => {
        dispatch(setAvatar(''));
        dispatch(RemoveAvatar({ email }));
        setModal(false);
    };
    setTimeout(() => {
        if (element.current && isModal) element.current.focus();
    }, 150);

    return (
        <div className={styles.contentWrapper} tabIndex={1} ref={element}>
            <p className={styles.about}>
                Вы можете загрузить изображение
                в формате JPG или PNG.
            </p>
            <ChangeFileController
                styles={styles}
                upload={upload}
                changeFile={changeFile}
                files={files}
                setFiles={setFiles}
            />
            <BtnAddCard
                dinamicclassname={styles.btnRemoveAvatar}
                children={'Удалить аватар'}
                onClick={removeAvatar}
            />
        </div>
    );
});
export default AddAvatarContent;