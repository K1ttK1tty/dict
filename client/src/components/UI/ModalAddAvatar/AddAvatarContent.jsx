import React, { useRef, memo } from 'react';
// components
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import ChangeFileController from './ChangeFileController';
// styles
import styles from './AddAvatarContent.module.css'
// redux
import { RemoveAvatar } from '../../../store/reducers/authorization/Authorization/ActionCreator';
import { setAvatar } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const AddAvatarContent = memo(function ({ changeFile, files, upload, setFiles, email, setModal, dispatch }) {

    const element = useRef()
    const setFocus = () => {
        setTimeout(() => {
            element.current.focus()
        }, 150);
    }
    const removeAvatar = () => {
        dispatch(setAvatar(''))
        dispatch(RemoveAvatar({ email }))
        setModal(false)
    }
    return (
        <div className={styles.contentWrapper} tabIndex={'1'} onClick={setFocus()} ref={element}>
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
    )
});
export default AddAvatarContent;