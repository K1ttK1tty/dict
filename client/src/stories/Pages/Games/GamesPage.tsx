import { authorizationData } from '../../../Tests/ComponentsTest/TestsConsts';
import Games from '../../../pages/Games';
import { WrapInProviderAndRouter } from '../../Helpers/WrapInProviderAndRouter';

export const GamesUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ height: '1000px' }}>
            <Games />
        </div>,
    );
};
export const GamesWithCardsUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ height: '1000px' }}>
            <Games />
        </div>,
        { AuthSlice: authorizationData },
    );
};
