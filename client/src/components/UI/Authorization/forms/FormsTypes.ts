export interface IFormProps {
    showPassword: boolean;
    setShowPassword: (state: boolean) => void;
    isLogin: boolean;
}
export interface IFormLoginHookArgs {
    email: string;
    password: string;
}
export interface IFormRegistrationHookArgs extends IFormLoginHookArgs {
    name: string;
}
export interface IChangePassword {
    email: string;
}
export interface ISetNewPassword {
    password: string;
}
export interface IFormIcon {
    styles: CSSModuleClasses;
    setShowPassword: (a: boolean) => void;
}
export interface IShowIcon extends IFormIcon {
    showPassword: boolean;
}