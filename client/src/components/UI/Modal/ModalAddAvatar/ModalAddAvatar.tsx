import { FC, memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import { GetAvatar, UploadAvatar } from '../../../../store/reducers/authorization/Authorization/ActionCreator';
import { setServerMessage } from '../../../../store/reducers/authorization/Authorization/AuthSlice';

import { IModalAddAvatar } from '../ModalsModels';

import Modal from '../Modal';
import AddAvatarContent from './AddAvatarContent';

const ModalAddAvatar: FC<IModalAddAvatar> = memo(function ({ isAvatarModal, setModal }) {
    const dispatch = useAppDispatch();
    const email = useAppSelector(state => state.AuthSlice?.user?.email);
    const [files, setFiles] = useState<FileList | []>([]);
    const [prev, setPrev] = useState<boolean>(isAvatarModal);
    const upload = () => {
        if (!files[0]) {
            window.alert('Добавьте файл');
            return;
        }
        dispatch(UploadAvatar({ email, avatar: files[0] }));
        setModal(false);
        setTimeout(() => {
            dispatch(GetAvatar(email));
        }, 1000);
    };
    const changeFile = (file: HTMLInputElement) => {
        if (file.files) {
            const extension = file.files[0].name.split('.').pop();
            if (extension === 'jpg' || extension === 'png') {
                setFiles(file.files);
            } else {
                file.value = '';
                dispatch(setServerMessage('Нужно выбрать файлы с расширением jpg/png'));
            }
        }
    };
    if (isAvatarModal !== prev) {
        setPrev(isAvatarModal);
        if (!isAvatarModal) setFiles([]);
    }
    return (
        <Modal
            testid="modalAvatar"
            title={'Загрузка нового аватара'}
            isModal={isAvatarModal}
            setModal={setModal}
            content={
                <AddAvatarContent
                    changeFile={changeFile}
                    files={files}
                    upload={upload}
                    setFiles={setFiles}
                    email={email}
                    setModal={setModal}
                    isModal={isAvatarModal}
                />
            }
        />
    );
});
export default ModalAddAvatar;
