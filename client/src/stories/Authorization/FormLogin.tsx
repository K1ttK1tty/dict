import styles from '../../components/UI/Authorization/Authorization.module.css';
import ChangePassword from '../../components/UI/Authorization/ResetPassword/ChangePassword';
import SetNewPassword from '../../components/UI/Authorization/SetNewPassword/SetNewPassword';
import FormLogin from '../../components/UI/Authorization/forms/FormLogin';
import FormRegistration from '../../components/UI/Authorization/forms/FormRegistration';
import Authorization from '../../components/UI/Authorization/Authorization';
import '../../styles/App.css';

import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 10;
export const LoginUI = () => {
    return WrapInProviderAndRouter(
        <div className={styles.back}>
            <div className={styles.content}>
                <FormLogin isLogin={true} showPassword={false} setShowPassword={y} />
            </div>
        </div>,
    );
};
export const RegistrationUI = () => {
    return WrapInProviderAndRouter(
        <div className={styles.back}>
            <div className={styles.content}>
                <FormRegistration isLogin={false} showPassword={false} setShowPassword={y} />
            </div>
        </div>,
    );
};
export const ChangePasswordUI = () => {
    return WrapInProviderAndRouter(<ChangePassword />);
};
export const SetNewPasswordUI = () => {
    return WrapInProviderAndRouter(<SetNewPassword />);
};
export const AuthorizationUI = () => {
    return WrapInProviderAndRouter(<Authorization />);
};
