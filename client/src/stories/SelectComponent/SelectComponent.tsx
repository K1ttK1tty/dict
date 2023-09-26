import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';
import DropDownColors from '../../components/UI/MySelect/DropDownColors';
import MySelect from '../../components/UI/MySelect/MySelect';
import styles from '../../components/UI/MySelect/MySelect.module.css';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 8;

interface ISelectU {
    open: boolean;
    removeMark: boolean;
}
export const SelectComponentUI = ({ open, removeMark }: ISelectU) => {
    return WrapInProviderAndRouter(
        <MySelect
            setIsModal={y}
            selectedColorOrNewLabel={y}
            setIsSelectOpen={y}
            setSelectedColorOrNewLabel={y}
            isSelectOpen={{ open, removeMark }}
        />,
        { AuthSlice: authorizationData },
    );
};

export const ColorsUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ width: '170px', position: 'relative',margin:'0px auto' }}>
            <DropDownMenu
                isMenuOpen={true}
                setIsMenuOpen={y}
                dinamicClassName={[styles.dropDownForStorybook, styles.dropDown, styles.open].join(' ')}
                content={<DropDownColors setSelectedColorOrNewLabel={y} setIsSelectOpen={y} />}
            />
        </div>,
    );
};
