import Settings from '../../../pages/Settings';
import { WrapInProviderAndRouter } from '../../Helpers/WrapInProviderAndRouter';

export const SettingsUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ height: '1000px' }}>
            <Settings />
        </div>,
    );
};
