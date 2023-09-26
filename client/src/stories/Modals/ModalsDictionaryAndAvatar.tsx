import Modal from "../../components/UI/Modal/Modal";
import ModalAddAvatar from "../../components/UI/Modal/ModalAddAvatar/ModalAddAvatar";
import ModalDictionaryMain from "../../components/UI/Modal/ModalDictionary/ModalDictionaryMain";
import { WrapInProviderAndRouter } from "../Helpers/WrapInProviderAndRouter";


const y: any = null;
const t: any = 10;

export const ModalAddAvatarUI = () => {
    return WrapInProviderAndRouter(<ModalAddAvatar isAvatarModal={t} setModal={t} />);
};

export const ModalDictionaryChangeUI = () => {
    return WrapInProviderAndRouter(
        <Modal
            testid="modalDictionary"
            title={'Смена словаря'}
            isModal={true}
            setModal={t}
            back={true}
            backFunc={y}
            content={
                <ModalDictionaryMain
                    isModal={true}
                    setIsModal={t}
                    setDictionaryContent={t}
                    dictionaryContent={{
                        removeContent: false,
                        createContent: false,
                        changeContent: true,
                    }}
                    title={'Смена словаря'}
                />
            }
        />,
    );
};
export const ModalDictionaryCreateUI = () => {
    return WrapInProviderAndRouter(
        <Modal
            testid="modalDictionary"
            title={'Создание словаря'}
            isModal={true}
            setModal={t}
            back={true}
            backFunc={t}
            content={
                <ModalDictionaryMain
                    isModal={true}
                    setIsModal={t}
                    setDictionaryContent={t}
                    dictionaryContent={{
                        removeContent: false,
                        createContent: true,
                        changeContent: false,
                    }}
                    title={'Создание словаря'}
                />
            }
        />,
    );
};
export const ModalDictionaryDeleteUI = () => {
    return WrapInProviderAndRouter(
        <Modal
            testid="modalDictionary"
            title={'Удаление словаря'}
            isModal={true}
            setModal={y}
            back={true}
            backFunc={y}
            content={
                <ModalDictionaryMain
                    isModal={true}
                    setIsModal={y}
                    setDictionaryContent={y}
                    dictionaryContent={{
                        removeContent: true,
                        createContent: false,
                        changeContent: false,
                    }}
                    title={'Удаление словаря'}
                />
            }
        />,
    );
};
