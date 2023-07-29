import { FC, useRef, useState } from 'react';

import { keyClose } from '../../../functions/keyClose';

import styles from './DropDownMenu.module.css';

import { IDropDownMenu } from './DropDownMenuMode';

const DropDownMenu: FC<IDropDownMenu> = function ({
    content,
    isMenuOpen,
    setIsMenuOpen,
    dinamicClassName,
    isAvatarModal,
}) {
    let isOpenMenu = [styles.content, styles.hidden].join(' ');
    if (isMenuOpen && !isAvatarModal) isOpenMenu = styles.content;

    const [prev, setPrev] = useState<boolean>(isMenuOpen);
    const menuElement = useRef<HTMLDivElement | null>(null);
    if (isMenuOpen !== prev) {
        setPrev(isMenuOpen);
        setTimeout(() => {
            if (menuElement.current) {
                menuElement.current.focus();
            }
        }, 150);
        document.body.onmousedown = () => {
            setIsMenuOpen(false);
        };
    }

    return (
        <div
            onKeyDown={e => keyClose(e, setIsMenuOpen)}
            className={[isOpenMenu, dinamicClassName].join(' ')}
            tabIndex={1}
            ref={menuElement}
        >
            {content}
        </div>
    );
};
export default DropDownMenu;
