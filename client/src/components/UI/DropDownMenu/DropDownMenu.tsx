import { FC, useRef, useEffect, memo, ReactNode } from 'react';
// styles
import styles from './DropDownMenu.module.css';
import { keyClose } from '../../../functions/keyClose';
interface IDropDownMenu {
    isMenuOpen: boolean;
    setIsMenuOpen: (state: boolean) => void;
    content: ReactNode;
    dinamicClassName?: string;
    isAvatarMenuOpen?: boolean;
}
const DropDownMenu: FC<IDropDownMenu> = memo(function (
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
    }, [isMenuOpen]);

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
});
export default DropDownMenu;