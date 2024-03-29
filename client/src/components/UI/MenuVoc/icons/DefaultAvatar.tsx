import { FC, memo } from 'react';

import { IDefaultAvatar } from '../MenuVocModel';

const DefaultAvatar: FC<IDefaultAvatar> = memo(function ({ style }) {
    return (
        <svg className={style} width="30px" height="30px" viewBox="0 0 24 24" fill="none">
            <path
                id="Vector"
                d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 
                13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 
                10.7614 14.7614 13 12 13Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
});
export default DefaultAvatar;
