import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IInputValue } from '../../../store/storeModels';
export interface IModal {
    title: string;
    content: React.ReactNode;
    isModal: boolean;
    setModal?: (state: boolean) => void;
    setFields?: ActionCreatorWithPayload<(IInputValue)>;
    dinamicClassName?: string;
    back?: boolean;
    backFunc?:()=>void;
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
    isAvatarModal: boolean;
    setModal: (state: boolean) => void;
}
export interface ModalAddCards {
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    isAddCardModal: boolean;
    setIsAddCardModal: (state: boolean) => void;
}
export interface IFormAddCard extends ModalAddCards {
    modalAdd?: React.MutableRefObject<HTMLInputElement | null>;
    showRelatedCard: boolean;
    setShowRelatedCard: (state: boolean) => void;
    setIsAddCardModal: (state: boolean) => void;
    isAddCardModal: boolean;
}
export interface IModalEditCard {
    isEditCardModal: boolean;
    setIsEditCardModal: (state: boolean) => void;
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
export interface IFormEditCard {
    setIsEditCardModal: (state: boolean) => void;
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
export interface IModalEditThemes {
    isEditThemesModal: boolean;
    setIsEditThemesModal: (state: boolean) => void;
}
export interface IModalEditThemesContent {
    setIsEditThemesModal: (state: boolean) => void;
    isEditThemesModal: boolean;
}
export type TDebounce<T> = (
    variable: ReturnType<typeof setTimeout>,
    setId: (state: ReturnType<typeof setTimeout>) => void,
    callback: T,
    time: number,
) => void;
export interface IModalDictionary {
    isModal: boolean;
    setIsModal: (state: boolean) => void;
}
export interface IDictionaryContent {
    removeContent: boolean;
    createContent: boolean;
    changeContent: boolean;
}
export interface IModalDictionaryMain {
    isModal: boolean;
    setIsModal: (state: boolean) => void;
    setDictionaryContent: (state: IDictionaryContent) => void;
    dictionaryContent: IDictionaryContent;
}