// types
import { AppDispatch } from '../store/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    setModal: ((state: boolean) => void) | undefined,
    dispatch: AppDispatch | undefined,
    setFields?: ActionCreatorWithPayload<(ICard)>
) => void;
export const removeModal: FunctType = (setModal, dispatch, object) => {
    if (setModal) setModal(false);
    if (object && dispatch) dispatch(object({ id: 0, word: '', translate: '', theme: '' }));
};