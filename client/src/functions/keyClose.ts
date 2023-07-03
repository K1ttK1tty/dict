// redux
import { AppDispatch } from '../store/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
// types
import { IInputValue } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    e: React.KeyboardEvent<HTMLDivElement>,
    closeModal: ((state: boolean) => void) | undefined,
    dispatch?: AppDispatch | undefined,
    setFields?: ActionCreatorWithPayload<(IInputValue)>
) => void;
export const keyClose: FunctType = (e, closeModal, dispatch, object) => {
    if (e.code === 'Escape' && closeModal) {
        closeModal(false);
        if (object && dispatch) dispatch(object({ id: 0, word: '', translate: '', theme: '', note: '' }));
    }
};