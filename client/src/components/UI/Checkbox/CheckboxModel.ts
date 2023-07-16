export interface ICheckbox {
    id: string;
    defaultChecked: boolean;
    dinamicClassName?: string;
    dinamicClassNameWrapper?:string;
    callback: React.ChangeEventHandler<HTMLInputElement>;
}