import { ReactNode } from 'react';

export interface IDropDownMenu {
    isMenuOpen: boolean;
    setIsMenuOpen: (state: boolean) => void;
    content: ReactNode;
    dinamicClassName?: string;
    isAvatarModal?: boolean;
}
