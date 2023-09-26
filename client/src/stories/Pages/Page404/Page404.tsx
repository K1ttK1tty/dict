import NotFoundPage from '../../../pages/NotFoundPage';
import { WrapInProviderAndRouter } from '../../Helpers/WrapInProviderAndRouter';

export const Page404UI = () => {
    return WrapInProviderAndRouter(<NotFoundPage />);
};
