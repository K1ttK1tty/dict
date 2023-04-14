import React from 'react';
const Icon4 = function ({fill, icon4Class }) {

    return (
        <svg className={icon4Class} viewBox="0 0 24 24" fill="none">
            <circle className={fill} cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
            <path d="M10 8.48352C10.5 7.49451 11 7 12 7C13.2461 7 14 7.98901 14 8.97802C14 9.96703 13.5 10.4615 12 11.4505V13M12 16.5V17" className={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
};
export default Icon4;