export interface IBtnProps {
    children: string;
    aria?: string;
    dinamicclassname?: string;
    noClick?: string;
    style?: React.HTMLAttributes<HTMLButtonElement>;
    onClick?: (element: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseDown?: (key: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
}
