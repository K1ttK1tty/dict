import { dataWithCardsForStatisticsPage } from '../../../Tests/ComponentsTest/TestsConsts';
import Statistics from '../../../pages/Statistics';
import { WrapInProviderAndRouter } from '../../Helpers/WrapInProviderAndRouter';

export const StatisticsWithCardsUI = () => {
    return WrapInProviderAndRouter(<Statistics />, { AuthSlice: dataWithCardsForStatisticsPage });
};
export const StatisticsWithoutCardsUI = () => {
    return WrapInProviderAndRouter(<Statistics />);
};
