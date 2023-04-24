import React from 'react';
// components
import IconHide from '../../icons/IconHide';
import IconShow from '../../icons/IconShow';
const ShowIcon = function ({ showPassword, styles, setShowPassword }) {

    return (
        <div>
            {showPassword
                ? <IconHide
                    setShowPassword={setShowPassword}
                    style={styles.iconStyle}
                />

                : < IconShow
                    setShowPassword={setShowPassword}
                    style={styles.iconStyle}
                />
            }
        </div>
    )
};
export default ShowIcon;