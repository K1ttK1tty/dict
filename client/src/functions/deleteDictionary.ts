import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setData, setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { IDataStructure } from '../store/storeModels';

import { TDeleteDictionary } from './functoinModels';

export const deleteDictionary: TDeleteDictionary = (dictionaryName, email, data, dispatch) => {
    if (dictionaryName === 'default') {
        dispatch(setServerMessage('Стандартный словарь нельзя удалить!'));
        return;
    }
    const newArray: IDataStructure = JSON.parse(JSON.stringify(data));
    delete newArray[dictionaryName];
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};
