export interface IFormProps {
    email: string;
    setEmail: (state: string) => void;
    password:string;
    setPassword: (state: string) => void;
    showPassword:boolean;
    setShowPassword:(state:boolean)=>void;
    action: (a:React.MouseEvent<HTMLElement>)=>void;
    isLogin: boolean;
}
export interface IFormRegistrationProps extends IFormProps {
    userName: string;
    setUserName: (a: string) => void;
}