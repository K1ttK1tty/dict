import MenuDesk from '../../components/UI/MenuDesk/MenuDesk';

import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 8;
export const MenuDescUI = () => {
    return WrapInProviderAndRouter(<MenuDesk menuOpen={y} setMenuOpen={y} />);
};
