// AuthSlice.ts
export interface IChangeCard {
    word: string;
    translate: string;
    theme: string;
}
export interface ICards extends IChangeCard {
    id: number;
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    isActivated: boolean;
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
    errors: [] | { value: string, msg: string, param: string, location: string }
}
export interface IUpdateCards extends IEmail {
    cards: ICards;
}
export interface IUpdateThemes extends IEmail {
    themes: string[];
}
export interface IUploadAvatar extends IEmail {
    avatar: File;
}
export interface ILogin extends ICheckAuth {
    userContent: IUserContent;
}
export interface IUserContent {
    userCards: ICards[];
    userThemes: string[];
}