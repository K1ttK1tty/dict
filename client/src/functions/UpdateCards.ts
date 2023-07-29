import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { setData } from '../store/reducers/authorization/Authorization/AuthSlice';
import { IDataStructure } from '../store/storeModels';

import { TUpdatedCards } from './functoinModels';

export const updatedCards: TUpdatedCards = (dictionaryName, email, data, newCards, newThemes, dispatch) => {
    const newArray: IDataStructure = JSON.parse(JSON.stringify(data));
    newArray[dictionaryName].cards = newCards;
    newArray[dictionaryName].selectOptions = newThemes;
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};
