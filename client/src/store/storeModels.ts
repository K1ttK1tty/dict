// AuthSlice.ts
export interface ICard {
    id: number;
    word: string;
    translate: string;
    theme: string;
    note: string;
    time: number;
    color: 'green' | 'red' | 'orange';
    favorite: boolean;
}
export interface IInputValue {
    id: number;
    word: string;
    translate: string;
    theme: string;
    note: string;
    favorite: boolean;
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    isActivated: boolean;
    registrationDate: string;
}
export interface IOptionState {
    open: boolean;
    removeMark: boolean;
}
// ActionCreator.ts
export interface IEmail {
    email: string;
}
export interface IRegistrationProps extends IEmail {
    userName: string;
    password: string;
}
export interface IActivateMailProps extends IEmail {
    id: number;
}
export interface ILoginProps extends IEmail {
    password: string;
}
export interface IMessage {
    message: string;
}
export interface ICheckAuth extends IMessage {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
export interface IFetchError extends IMessage {
    errors: [] | { value: string; msg: string; param: string; location: string };
}
export interface IUploadAvatar extends IEmail {
    avatar: File;
}
export interface ILogin extends ICheckAuth {
    userContent: IUserContent;
}
export interface IUserContent {
    userCards: ICard[];
    userThemes: string[];
}
export interface IRegistration {
    message: string;
    userData: {
        accessToken: string;
        refreshToken: string;
        user: {
            activationLink: string;
            email: string;
            id: number;
            name: string;
            registrationDate: string;
        };
    };
}
export interface IInput {
    isOpen: boolean;
    after: string;
}
export interface IUpMenuInitialState {
    input: IInput;
    searchWord: string;
    isSearchByWord: boolean;
    isLetterCaseInclude: boolean;
}
export interface IModalRenameCardInitialState {
    indexCard: number;
    inputValue: IInputValue;
    editCard: IInputValue;
}
export interface IGamesSliceInitialState {
    inputReq: number;
    validateArr: string[];
}
export interface IRefreshPassword {
    password: string;
    id: string | null;
}
export interface IAuthSliceInitialState {
    user: IUser;
    avatar: string;
    isAuth: boolean;
    isLoading: boolean;
    updateError: string;
    cards: ICard[] | [];
    currentDictionary: string;
    changeCard: ICard;
    selectOptions: string[];
    selectedTheme: string;
    serverMessage: string;
    data: IDataStructure;
}
interface IObjFields {
    selectOptions: string[];
    cards: ICard[];
}
export interface IDataStructure {
    default: IObjFields;
    [key: string]: IObjFields;
}
export interface IColorPicker {
    colorModeOn: boolean,
    colorRemoveMode: boolean,
    getCurrentColorMode: boolean,
    currentColor: string,
    colorsBeforePaint: string[],
}
