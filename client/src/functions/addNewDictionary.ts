import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setData } from '../store/reducers/authorization/Authorization/AuthSlice';

import { TAddNewDictionary } from './functoinModels';

export const addNewDictionary: TAddNewDictionary = (dictionaryName, email, data, dispatch) => {
    const newArray = {
        ...data,
        [dictionaryName]: {
            selectOptions: [],
            cards: [],
        },
    };
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};
