import { FC } from 'react';

import IconHide from '../../icons/IconHide';
import IconShow from '../../icons/IconShow';
import { IShowIcon } from '../FormsTypes';

const ShowIcon: FC<IShowIcon> = function ({ showPassword, styles, setShowPassword }) {
    return (
        <div>
            {showPassword ? (
                <IconHide setShowPassword={setShowPassword} styles={styles} />
            ) : (
                <IconShow setShowPassword={setShowPassword} styles={styles} />
            )}
        </div>
    );
};
export default ShowIcon;
