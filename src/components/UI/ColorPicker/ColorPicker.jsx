import React from 'react';
import { HexColorPicker } from 'react-colorful';
const ColorPicker = function ({ color, setColor }) {
    return (
        <HexColorPicker color={color} onChange={e => setColor(e)} />
    )
};
export default ColorPicker;