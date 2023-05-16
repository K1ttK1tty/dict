import { FC } from 'react';
import moduleStyles from './BtnAddCard.module.css';
// types
interface IBtnProps {
    children: string;
    aria?: string;
    dinamicclassname?: string;
    noClick?: string;
    style?: React.HTMLAttributes<HTMLButtonElement>;
    onClick?: ((element: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onMouseDown?: (key: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
}
const BtnAddCard: FC<IBtnProps> =
    function ({ children, style, noClick, aria, dinamicclassname, type, ...props }) {
        return (
            <button
                aria-label={aria}
                style={style}
                type={type}
                {...props}
                className={[moduleStyles.btnAddCard, dinamicclassname, noClick].join(' ')}>
                {children}
            </button>
        );
    };
export default BtnAddCard;