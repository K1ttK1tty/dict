import { FC, memo } from 'react';
import { IPicIcon } from '../CardsControlModel';
const PinIcon: FC<IPicIcon> = memo(function ({ styles, setIsAttached }) {
    return (
        <svg onClick={() => setIsAttached(prev => !prev)} className={styles}
            height="18px" width="18px" viewBox="0 0 512 512" >
            <polygon
                points="85.564,392.665 23.785,454.449 0,508.121
                53.677,484.337 180.196,357.818 150.304,327.92"
            />
            <path
                d="M422.416,93.462L332.837,3.879c-31.304,31.308-12.697,
                75.686-12.697,75.686l-132.209,84.362
                c-43.25-22.714-103.589-5.941-133.414,23.884L328.051,461.36
                c29.843-29.824,46.625-90.166,23.902-133.422l84.351-132.199
		        c0,0,44.388,18.606,75.696-12.693L422.416,93.462z"
            />
        </svg>
    );
});
export default PinIcon;