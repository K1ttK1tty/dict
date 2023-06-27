import { IInitialState } from './AuthSlice';
export const initialState: IInitialState = {
    // authorization
    user: {
        id: 0,
        name: '',
        email: '',
        isActivated: false
    },
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
        note:''
    },
    // select
    optionName: 'Тема',
    optionState: { open: false, removeMark: false },
    selectOptions: [],
    chooseTheme: '',
    // servers response
    serverMessage: '',
};