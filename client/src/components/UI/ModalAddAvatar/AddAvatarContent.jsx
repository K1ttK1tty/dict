import React, { useRef, memo } from 'react';
// components
import DisplayFile from './DisplayFile';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// styles
import styles from './AddAvatarContent.module.css'
// redux
import { RemoveAvatar } from '../../../store/reducers/authorization/Authorization/ActionCreator';
import { setAvatar } from '../../../store/reducers/authorization/Authorization/AuthSlice';
const AddAvatarContent = memo(function ({ changeFile, files, upload, setFiles, email, dispatch }) {

    const element = useRef()
    const setFocus = () => {
        setTimeout(() => {
            element.current.focus()
        }, 150);
    }

    const removeAvatar = () => {
        dispatch(setAvatar(''))
        dispatch(RemoveAvatar({ email }))
    }

    return (
        <div className={styles.contentWrapper} tabIndex={'1'} onClick={setFocus()} ref={element}>
            <p className={styles.about}>Вы можете загрузить изображение в формате JPG или PNG.</p>
            <div className={styles.wrapper}>

                {files[0]?.name ?
                    <input
                        className={styles.inputUpload}
                        onClick={upload}
                        type="submit"
                        value='Загрузить'
                    />
                    : <label className={styles.label}> Выбрать файл
                        <input
                            className={styles.input}
                            onChange={e => changeFile(e.target)}
                            accept="image/png, image/jpeg"
                            type="file"
                        />
                    </label>
                }
                {files[0]?.name &&
                    <DisplayFile
                        files={files}
                        styles={styles}
                        setFiles={setFiles}
                    />
                }

            </div>

            <BtnAddCard
                dinamicclassname={styles.btnRemoveAvatar}
                children={'Удалить аватар'}
                onClick={removeAvatar}
            />
        </div>
    )
});
export default AddAvatarContent;