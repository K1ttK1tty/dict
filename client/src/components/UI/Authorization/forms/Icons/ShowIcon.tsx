import { FC } from 'react';
// components
import IconHide from '../../icons/IconHide';
import IconShow from '../../icons/IconShow';
// types
export interface IFormIcon {
    styles: CSSModuleClasses;
    setShowPassword: (a: boolean) => void;
}
interface IShowIcon extends IFormIcon {
    showPassword: boolean;
}

const ShowIcon: FC<IShowIcon> = function ({ showPassword, styles, setShowPassword }) {
    return (
        <div>
            {showPassword
                ? <IconHide
                    setShowPassword={setShowPassword}
                    styles={styles}
                />
                : < IconShow
                    setShowPassword={setShowPassword}
                    styles={styles}
                />
            }
        </div>
    );
};
export default ShowIcon;