import { TDeleteDictionary } from './functoinModels';
import { IDataStructure } from '../store/storeModels';
import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setData } from '../store/reducers/authorization/Authorization/AuthSlice';
export const deleteDictionary: TDeleteDictionary = ( dictionaryName, email, data, dispatch) => {
    if (dictionaryName === 'default') {
        dispatch(setServerMessage('Стандартный словарь нельзя удалить!'));
        return;
    }
    const newArray: IDataStructure = JSON.parse(JSON.stringify(data));
    delete newArray[dictionaryName];
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};