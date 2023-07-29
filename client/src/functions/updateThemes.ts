import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setData } from '../store/reducers/authorization/Authorization/AuthSlice';
import { IDataStructure } from '../store/storeModels';

import { TUpdateThemes } from './functoinModels';

export const updateThemes: TUpdateThemes = (dictionaryName, email, data, newThemes, dispatch) => {
    const newArray: IDataStructure = JSON.parse(JSON.stringify(data));
    newArray[dictionaryName].selectOptions = newThemes;
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};
