import Checkbox from '../../components/UI/Checkbox/Checkbox';
import '../../components/UI/Checkbox/Checkbox.module.css';

import '../../styles/Games.css';
import '../../styles/theme.css';

import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 9;
export const CheckboxChecked = () => {
    return WrapInProviderAndRouter(
        <div style={{ width: '220px', height: '35px' }}>
            <Checkbox id={'12'} defaultChecked={true} callback={y} dinamicClassNameWrapper="mr6" />
            Алфавитный порядок
        </div>,
    );
};
export const CheckboxNotChecked = () => {
    return WrapInProviderAndRouter(
        <div style={{ width: '220px', height: '35px' }}>
            <Checkbox id={'14'} defaultChecked={false} callback={y} dinamicClassNameWrapper="mr6" />
            Алфавитный порядок
        </div>,
    );
};
