import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
interface IReduxAction {
    dispatch: AppDispatch;
    func: ActionCreatorWithPayload<string>;
    state: string;
}
interface ISetStateAction {
    func: (state: string) => void;
    value: string;
}
export const debounce =
    (
        variable: ReturnType<typeof setTimeout>,
        stateAction: ISetStateAction | null,
        // callback: ((state?: string) => void) | null | void,
        reduxObj: IReduxAction | null
    ) => {
        clearTimeout(variable);
        variable = setTimeout(() => {
            stateAction
                ? stateAction.func(stateAction.value)
                : reduxObj?.dispatch(reduxObj.func(reduxObj.state));
        }, 400);
    };