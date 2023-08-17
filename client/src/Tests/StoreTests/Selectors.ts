import { ICard, IDataStructure, IUser } from '../../store/storeModels';

export const getUserAuthSlice = (state: { AuthSlice: { user: IUser } }) =>
    state?.AuthSlice?.user || {
        id: 0,
        name: 'name',
        email: 'email',
        isActivated: false,
        registrationDate: '12-7-2023',
    };
export const getUserData = (state: { AuthSlice: { data: IDataStructure } }) =>
    state?.AuthSlice?.data || {
        default: {
            selectOptions: [],
            cards: [],
        },
    };
export const getCurrentDictionary = (state: { AuthSlice: { currentDictionary: string } }) =>
    state?.AuthSlice?.currentDictionary || 'default';
export const getAvatar = (state: { AuthSlice: { avatar: string } }) => state?.AuthSlice?.avatar || '';
export const getAuthInAuthSlice = (state: { AuthSlice: { isAuth: boolean } }) => state?.AuthSlice?.isAuth || false;
export const getIsLoading = (state: { AuthSlice: { isLoading: boolean } }) => state?.AuthSlice?.isLoading || false;
export const getUpdateError = (state: { AuthSlice: { updateError: string } }) => state?.AuthSlice?.updateError || '';
export const getCards = (state: { AuthSlice: { cards: ICard[] } }) => state?.AuthSlice?.cards || [];
export const getChangeCard = (state: { AuthSlice: { changeCard: ICard } }) =>
    state?.AuthSlice?.changeCard || {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: '',
        time: 0,
        color: 'red',
        favorite: false,
    };
export const getSelectOptions = (state: { AuthSlice: { selectOptions: string[] } }) =>
    state?.AuthSlice?.selectOptions || [];
export const getSelectedTheme = (state: { AuthSlice: { selectedTheme: string } }) =>
    state?.AuthSlice?.selectedTheme || '';
export const getServerMessage = (state: { AuthSlice: { serverMessage: string } }) =>
    state?.AuthSlice?.serverMessage || '';
