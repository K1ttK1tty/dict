import { FC, memo, useState } from 'react';

import { IDictionaryContent, IModalDictionary } from '../ModalsModels';

import Modal from '../Modal';
import ModalDictionaryMain from './ModalDictionaryMain';

const ModalDictionary: FC<IModalDictionary> = memo(function ({ isModal, setIsModal }) {
    const [dictionaryContent, setDictionaryContent] = useState<IDictionaryContent>({
        removeContent: false,
        createContent: false,
        changeContent: false,
    });
    let title = 'Словарь';
    if (dictionaryContent.changeContent) title = 'Смена словаря';
    else if (dictionaryContent.createContent) title = 'Создание';
    else if (dictionaryContent.removeContent) title = 'Удаление';

    const [prev, setPrev] = useState<boolean>(false);
    if (prev !== isModal) {
        setPrev(isModal);
        setDictionaryContent({
            removeContent: false,
            createContent: false,
            changeContent: false,
        });
    }
    return (
        <Modal
            testid="modalDictionary"
            title={title}
            isModal={isModal}
            setModal={setIsModal}
            back={title !== 'Словарь'}
            backFunc={() =>
                setDictionaryContent({
                    removeContent: false,
                    createContent: false,
                    changeContent: false,
                })
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
