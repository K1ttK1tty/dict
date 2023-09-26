import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';
import style from '../../components/UI/InputSearch/InputSearch.module.css';
import SearchParamsMenu from '../../components/UI/InputSearch/SearchParamsMenu';
import MenuVoc from '../../components/UI/MenuVoc/MenuVoc';
import Info from '../../components/UI/UserMenu/Info';
import UserMenu from '../../components/UI/UserMenu/UserMenu';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 0;
export const MenuVocUI = () => {
    return WrapInProviderAndRouter(<MenuVoc setMenuOpen={y} />, {
        upMenu: {
            input: { isOpen: true, after: '' },
            searchWord: '',
            isSearchByWord: true,
            isLetterCaseInclude: false,
        },
    });
};
export const DropDownMenuUI = () => {
    return WrapInProviderAndRouter(
        <DropDownMenu
            isMenuOpen={true}
            setIsMenuOpen={y}
            dinamicClassName={[style.DropDownMenuClassName, style.top0px].join(' ')}
            content={<SearchParamsMenu />}
        />,
    );
};
interface IUserMenuUI {
    isActivated: boolean;
    isDropDownMenuOpen: boolean;
}
export const UserMenuUI = ({ isActivated, isDropDownMenuOpen }: IUserMenuUI) => {
    return WrapInProviderAndRouter(
        <DropDownMenu
            isMenuOpen={true}
            setIsMenuOpen={y}
            dinamicClassName={style.top0px}
            content={<UserMenu setModal={y} isActivated={isActivated} isDropDownMenuOpen={isDropDownMenuOpen} />}
        />,
        { AuthSlice: authorizationData },
    );
};
export const InfoUI = () => {
    return WrapInProviderAndRouter(<Info isUserMenuOpen={true} />);
};
