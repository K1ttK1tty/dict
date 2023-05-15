import { FC, useState, useEffect, memo } from 'react';
// components
import Modal from '../Modal/Modal';
import AddAvatarContent from './AddAvatarContent';
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { UploadAvatar, GetAvatar } from '../../../store/reducers/authorization/Authorization/ActionCreator';
// types
interface IModalAddAvatar {
    isModal: boolean;
    setModal: (state: boolean) => void;
}
const ModalAddAvatar: FC<IModalAddAvatar> = memo(function ({ isModal, setModal }) {
    const dispatch = useAppDispatch();
    const email = useAppSelector(state => state.AuthSlice?.user?.email);
    const [files, setFiles] = useState<FileList | []>([]);

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
                window.alert('Нужно выбрать файлы с расширением jpg/png');
            }
        }
    };
    useEffect(() => {
        if (!isModal) setFiles([]);

        return () => setFiles([]);
    }, [isModal]);
    return (
        <Modal
            title={'Загрузка нового аватара'}
            isModal={isModal}
            setModal={setModal}
            content={
                <AddAvatarContent
                    changeFile={changeFile}
                    files={files}
                    upload={upload}
                    setFiles={setFiles}
                    email={email}
                    setModal={setModal}
                    isModal={isModal}
                />
            }
        />
    );
});
export default ModalAddAvatar;