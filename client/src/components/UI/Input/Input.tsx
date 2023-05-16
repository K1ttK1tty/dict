import { FC } from 'react';
import cl from '../Input/Input.module.css';
interface IInput {
    validClass: string;
}
const Input: FC<IInput> = function ({ validClass }) {
    return (
        <input className={[cl.input, validClass, 'inptReq ',].join(' ')}></input>
    );
};
export default Input;