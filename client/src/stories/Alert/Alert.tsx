import Alert from '../../components/UI/Alert/Alert';

import '../../styles/App.css';

import { IAuthSliceInitialState } from '../../store/storeModels';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const data: IAuthSliceInitialState = {
    ...authorizationData,
    serverMessage: 'Поля "Слово" и "Перевод" должны быть заполнены',
};

export const AlertForTest = () => WrapInProviderAndRouter(<Alert />, { AuthSlice: data });
