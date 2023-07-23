import { FC, useState, memo } from 'react';
// components
import Modal from '../Modal';
import ModalDictionaryMain from './ModalDictionaryMain';
// models
import { IModalDictionary, IDictionaryContent } from '../ModalsModels';
const ModalDictionary: FC<IModalDictionary> = memo(function ({ isModal, setIsModal }) {
    const [dictionaryContent, setDictionaryContent] = useState<IDictionaryContent>(
        {
            removeContent: false,
            createContent: false,
            changeContent: false
        }
    );
    let title: string;
    if (dictionaryContent.changeContent) title = 'Смена словаря';
    else if (dictionaryContent.createContent) title = 'Создание';
    else if (dictionaryContent.removeContent) title = 'Удаление';
    else title = 'Словарь';
    const [prev, setPrev] = useState<boolean>(false);
    if (prev !== isModal) {
        setPrev(isModal);
        setDictionaryContent(
            {
                removeContent: false,
                createContent: false,
                changeContent: false
            }
        );
    }
    return (
        <Modal
            title={title}
            isModal={isModal}
            setModal={setIsModal}
            back={title !== 'Словарь' ? true : false}
            backFunc={
                () => setDictionaryContent(
                    {
                        removeContent: false,
                        createContent: false,
                        changeContent: false
                    }
                )
            }
            content={
                <ModalDictionaryMain
                    isModal={isModal}
                    setIsModal={setIsModal}
                    setDictionaryContent={setDictionaryContent}
                    dictionaryContent={dictionaryContent}
                />
            }
        />
    );

});
export default ModalDictionary;