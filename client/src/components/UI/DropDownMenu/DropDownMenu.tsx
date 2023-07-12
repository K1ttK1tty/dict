import { FC, useState, useRef } from 'react';
// styles
import styles from './DropDownMenu.module.css';
import { keyClose } from '../../../functions/keyClose';
import { IDropDownMenu } from './DropDownMenuMode';
const DropDownMenu: FC<IDropDownMenu> = function (
    {
        content,
        isMenuOpen,
        setIsMenuOpen,
        dinamicClassName,
        isAvatarModal
    }) {
    const menuElement = useRef<HTMLDivElement | null>(null);
    let isOpenMenu = [styles.content, styles.hidden].join(' ');
    if (isMenuOpen && !isAvatarModal) {
        isOpenMenu = styles.content;
    }
    const [prev, setPrev] = useState<boolean>(isMenuOpen);
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
        </div >
    );
};
export default DropDownMenu;