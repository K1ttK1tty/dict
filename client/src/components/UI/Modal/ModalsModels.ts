import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IInputValue } from '../../../store/reducers/authorization/Authorization/AuthTypes';
export interface IModal {
    title: string;
    content: React.ReactNode;
    isModal: boolean;
    setModal?: (state: boolean) => void;
    setFields?: ActionCreatorWithPayload<(IInputValue)>;
    dinamicClassName?: string;
}
export interface IAddAvatarContent {
    changeFile: (file: HTMLInputElement) => void;
    files: FileList | [];
    upload: () => void;
    setFiles: (state: FileList | []) => void;
    email: string;
    setModal: (state: boolean) => void;
    isModal: boolean;
}
export interface IChangeFileController {
    styles: CSSModuleClasses;
    changeFile: (file: HTMLInputElement) => void;
    files: FileList | [];
    upload: () => void;
    setFiles: (state: FileList | []) => void;
}
export interface IDisplayFile {
    styles: CSSModuleClasses;
    files: FileList | [];
    setFiles: (state: FileList | []) => void;
}
export interface IModalAddAvatar {
    isModal: boolean;
    setModal: (state: boolean) => void;
}
export interface IFormAddCard {
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
}
export interface IFormEditCard {
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
export interface IModalEditThemes {
    isOpenModal: boolean;
    setIsModal: (state: boolean) => void;
}
export interface IModalEditThemesContent {
    setIsModal: (state: boolean) => void;
}