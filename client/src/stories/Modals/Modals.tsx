import ModalAddCards from '../../components/UI/Modal/ModalAddCards/ModalAddCards';
import ModalDictionary from '../../components/UI/Modal/ModalDictionary/ModalDictionary';
import ModalEditCard from '../../components/UI/Modal/ModalEditCard/ModalEditCard';
import ModalEditThemes from '../../components/UI/Modal/ModalEditThemes/ModalEditThemes';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = null;
export const ModalAddCardsUI = () => {
    return WrapInProviderAndRouter(<ModalAddCards modalAdd={y} isAddCardModal={true} setIsAddCardModal={y} />);
};
export const ModalEditCardUI = () => {
    return WrapInProviderAndRouter(
        <ModalEditCard isEditCardModal={true} setIsEditCardModal={y} modalChangeCard={y} />,
        {
            modalRenameCard: {
                indexCard: 0,
                inputValue: {
                    id: 0,
                    word: '',
                    translate: '',
                    theme: '',
                    note: '',
                    favorite: false,
                },
                editCard: {
                    id: 0,
                    word: 'Word',
                    translate: 'Translate',
                    theme: 'Theme',
                    note: 'Note note note note note note note note ',
                    favorite: false,
                },
            },
        },
    );
};
export const ModalEditThemesUI = () => {
    return WrapInProviderAndRouter(<ModalEditThemes isEditThemesModal={true} setIsEditThemesModal={y} />, {
        AuthSlice: authorizationData,
    });
};
export const ModalDictionaryUI = () => {
    return WrapInProviderAndRouter(<ModalDictionary isModal={true} setIsModal={y} />);
};
