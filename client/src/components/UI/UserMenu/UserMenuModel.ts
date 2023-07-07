export interface IQuestion {
    style: string;
    setIsOpen: (state: (prevState: boolean) => boolean) => void;
}
export interface IInfo {
    isUserMenuOpen: boolean;
}
export interface IUserMenuProps {
    isActivated: boolean;
    setModal: (state: boolean) => void;
    isDropDownMenuOpen: boolean;
}
export interface IUserTopMenu {
    hideMenu: string;
    isMenuOpen: boolean;
    setIsMenuOpen: (state: boolean) => void;
}