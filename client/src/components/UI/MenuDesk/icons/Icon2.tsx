import { FC, memo } from 'react';

import { IIconMenuDesc } from '../MenuDeskModel';

const Icon2: FC<IIconMenuDesc> = memo(function ({ className }) {
    return (
        <svg className={className} viewBox="0 0 512 512">
            <g>
                <path
                    d="m443.6,11h-321c-35.4,0-64.6,26.1-64.6,59.4v371.1c0,33.4 26.1,59.4 59.4,
                59.4h326.2c6.3,0 10.4-4.2 10.4-11.5v-468c0-6.2-4.2-10.4-10.4-10.4zm-321,20.9h310.5v350.3h
                -315.7c-14.9,0-28.3,5.2-38.6,13.9v-325.7c-1.42109e-14-21.9 19.8-38.5 43.8-38.5zm310.6,
                449.3h-315.8c-21.9,0-38.6-16.7-38.6-38.6 0-21.9 17.7-38.6 38.6-38.6l315.8,.1v77.1z"
                />
            </g>
        </svg>
    );
});
export default Icon2;
