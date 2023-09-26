import CardsInfo from '../../components/UI/CardsInfo/CardsInfo';

import '../../styles/App.css';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 9;
export const CardsInfoUI = () => {
    return WrapInProviderAndRouter(
        <div className="buttonPadiingBackground">
            <CardsInfo setIsDictionaryModal={y} selectedColorOrNewLabel={y} />
        </div>,
        { AuthSlice: authorizationData },
    );
};
