import React, { useState, memo } from 'react';
// components
import Modal from '../Modal/Modal';
import AddAvatarContent from './AddAvatarContent';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { UploadAvatar, GetAvatar } from '../../../store/reducers/asyncActions/ActionCreator';
const ModalAddAvatar = memo(function ({ isModal, setModal }) {
    const dispatch = useDispatch();
    const email = useSelector(state => state.AuthSlice.user.email);
    const [files, setFiles] = useState([])

    const upload = () => {
        if (!files[0]) {
            window.alert('Добавьте файл')
            return ;
        }
        dispatch(UploadAvatar({ email, avatar: files[0] }))
        setModal(false)
        setTimeout(() => {

            dispatch(GetAvatar(email))
        }, 1000);
    }

    const changeFile = (file) => {

        const extension = file.files[0].name.split('.').pop()
        if (extension === 'jpg' || extension === 'png') {
            setFiles(file.files)
        } else {
            file.value = ''
            window.alert('Нужно выбрать файлы с расширением jpg/png')
        }
    }

    return (
        <Modal
            title={'Загрузка нового аватара'}
            isModal={isModal}
            setModal={setModal}
            content={
                <AddAvatarContent
                    changeFile={changeFile}
                    upload={upload}
                />
            }

        />


    )
});
export default ModalAddAvatar;