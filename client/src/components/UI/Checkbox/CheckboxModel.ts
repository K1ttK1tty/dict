export interface ICheckbox {
    id: string;
    defaultChecked: boolean;
    dinamicClassName?: string;
    callback: React.ChangeEventHandler<HTMLInputElement>;
}