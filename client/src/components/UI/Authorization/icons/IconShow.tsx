import { FC } from 'react';

import { IFormIcon } from '../forms/FormsTypes';

const IconShow: FC<IFormIcon> = function ({ setShowPassword, styles }) {
    return (
        <svg
            onClick={() => setShowPassword(true)}
            className={styles.iconStyle}
            fill="#000000"
            width="27px"
            height="27px"
            viewBox="0 0 24 24"
        >
            <path
                d="M2.062,12.346C3.773,17,7.675,20,12,20s8.227-3,
            9.938-7.654a.993.993,0,0,0,0-.692C20.227,7,16.325,4,12,4S3.773,
            7,2.062,11.654A.993.993,0,0,0,2.062,12.346ZM12,6c3.373,0,6.451,
            2.343,7.929,6-1.478,3.657-4.556,6-7.929,6s-6.451-2.343-7.929-6C5.549,8.343,8.627,6,12
            ,6Zm0,10a4,4,0,1,0-4-4A4,4,0,0,0,12,16Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,10Z"
            />
        </svg>
    );
};
export default IconShow;
