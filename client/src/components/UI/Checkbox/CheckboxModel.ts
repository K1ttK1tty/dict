export interface ICheckbox {
    id: string;
    defaultChecked?: boolean;
    checked?:boolean;
    dinamicClassName?: string;
    dinamicClassNameWrapper?:string;
    callback: React.ChangeEventHandler<HTMLInputElement>;
}