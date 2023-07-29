import { FC } from 'react';
import { HexColorPicker } from 'react-colorful';

interface IColorPicker {
    color: string;
    setColor: (state: string) => void;
}
const ColorPicker: FC<IColorPicker> = function ({ color, setColor }) {
    return <HexColorPicker color={color} onChange={e => setColor(e)} />;
};
export default ColorPicker;
