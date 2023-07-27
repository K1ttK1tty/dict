import { IAuthSliceInitialState } from '../../../storeModels';
export const initialState: IAuthSliceInitialState = {
    // authorization
    user: {
        id: 0,
        name: '',
        email: '',
        isActivated: false,
        registrationDate: ''
    },
    data: {
        'default': {
            selectOptions: [],
            cards: []
        }
    },
    currentDictionary: 'default',
    avatar: '',
    isAuth: false,
    isLoading: false,
    updateError: '',
    // cards
    cards: [],
    changeCard: {
        id: 0,
        word: '',
        translate: '',
        theme: '',
        note: '',
        time: 0,
        color: 'red',
        favorite: false,
    },
    selectOptions: [],
    selectedTheme: '',
    serverMessage: '',
};

