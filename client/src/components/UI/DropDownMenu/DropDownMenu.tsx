import { FC, useRef, useEffect } from 'react';
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
        isAvatarMenuOpen
    }) {
    const menuElement = useRef<HTMLDivElement | null>(null);
    let isOpenMenu = [styles.content, styles.hidden].join(' ');
    if (isMenuOpen && !isAvatarMenuOpen) {
        isOpenMenu = styles.content;
        setTimeout(() => {
            if (menuElement.current) {
                menuElement.current.focus();
            }
        }, 150);
    }
    useEffect(() => {
        document.body.onmousedown = () => {
            setIsMenuOpen(false);
        };
    }, [isMenuOpen, setIsMenuOpen]);

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