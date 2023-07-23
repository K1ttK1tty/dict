import { AppDispatch } from '../store/store';
import { IInputValue, IOptionState, ICard } from '../store/storeModels';
import { IInput, IDataStructure } from '../store/storeModels';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
export type TAddNewCard = (
    e: React.MouseEvent<HTMLButtonElement>,
    inputValue: ICard,
    setIsAddCardModal: (state: boolean) => void,
    Cards: ICard[],
    selectOptions: string[],
    email: string,
    data: IDataStructure,
    dictionaryName: string,
    dispatch: AppDispatch,
) => void;
export type TAddNewTheme = (
    selectOptions: string[],
    newTheme: string,
    dispatch: AppDispatch,
) => string[];
export type TChangeCardFields = (
    cards: ICard[],
    oldCard: ICard,
    newCard: IInputValue,
) => ICard[];
export type TDeleteAllEmptyThemes = (
    cards: ICard[],
    allThemes: string[],
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void,
    isSelectOpen: IOptionState,
    email: string,
    data: IDataStructure,
    dictionaryName: string,
    dispatch: AppDispatch,
) => void;
export type TEditWord = (
    card: ICard,
    index: number,
    setIsEditCardModal: (state: boolean) => void,
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>,
    dispatch: AppDispatch,
) => void;
export type TDenerateQuizWords = (
    inputReq: number,
    setTestArray: (state: ICard[] | []) => void,
    currentColor: string,
    cards: ICard[],
    dispatch: AppDispatch,
) => void;
export type TInputSearchHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    input: IInput,
    dispatch: AppDispatch
) => void;
export type TKeyClose = (
    e: React.KeyboardEvent<HTMLDivElement>,
    closeModal: ((state: boolean) => void) | undefined,
    dispatch?: AppDispatch | undefined,
    setFields?: ActionCreatorWithPayload<(IInputValue)>
) => void;
export type TModalAddCard = (
    modalAdd: React.MutableRefObject<HTMLInputElement | null>,
    setIsAddCardModal: (state: boolean) => void,
) => void;
export type TOverrideTheme = (themesArray: string[], oldTheme: string, newTheme: string) => string[];
export type ToverrideThemesInCards = (cards: ICard[], oldTheme: string, newTheme: string) => ICard[];
export type TRemoveCard = (
    cardClickID: number,
    Cards: ICard[],
    email: string,
    data: IDataStructure,
    dictionaryName: string,
    selectOptions:string[],
    dispatch: AppDispatch,
) => void;
export type TRemoveInput = (
    elem: React.MouseEvent<HTMLDivElement>,
    input: IInput,
    dispatch: AppDispatch,
) => void;
export type TRemoveModal = (
    setModal: ((state: boolean) => void) | undefined,
    dispatch: AppDispatch | undefined,
    setFields?: ActionCreatorWithPayload<(IInputValue)>
) => void;
export type TCutLongLine = (line: string, symbolCount: number) => string;
export type TRemoveSelectTheme = (
    selectOptions: string[],
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void,
    isSelectOpen: IOptionState,
    selectedTheme: string,
    email: string,
    data: IDataStructure,
    dictionaryName: string,
    dispatch: AppDispatch,
) => void;
export type TValidateQuiz = (
    e: React.MouseEvent<HTMLButtonElement>,
    array: ICard[],
    testByWord: boolean,
    dispatch: AppDispatch,
) => void;
export type TShared = (
    state: string[],
    wordInCard: string,
    inputs: NodeListOf<HTMLInputElement>,
    index: number
) => void;
export type TUpdateThemes = (
    dictionaryName: string,
    email: string,
    data: IDataStructure,
    newThemes: string[],
    dispatch: AppDispatch
) => void
export type TUpdatedCards = (
    dictionaryName: string,
    email: string,
    data: IDataStructure,
    newCards: ICard[],
    newThemes: string[],
    dispatch: AppDispatch
) => void
export type TDeleteDictionary = (
    dictionaryName: string,
    email: string,
    data: IDataStructure,
    dispatch: AppDispatch
) => void;
export type TAddNewDictionary = (
    dictionaryName: string,
    email: string,
    data: IDataStructure,
    dispatch: AppDispatch
) => void