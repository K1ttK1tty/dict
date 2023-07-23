import { UploadData } from '../store/reducers/authorization/Authorization/ActionCreator';
import { IDataStructure } from '../store/storeModels';
import { setData } from '../store/reducers/authorization/Authorization/AuthSlice';
import { TUpdatedCards } from './functoinModels';
export const updatedCards: TUpdatedCards = (
    dictionaryName,
    email,
    data,
    newCards,
    newThemes,
    dispatch
) => {
    const newArray: IDataStructure = JSON.parse(JSON.stringify(data)); // must be data instead of cards
    newArray[dictionaryName].cards = newCards;
    newArray[dictionaryName].selectOptions = newThemes;
    dispatch(setData(newArray));
    dispatch(UploadData({ email: email, data: newArray }));
};