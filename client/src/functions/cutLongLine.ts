import { TCutLongLine } from './functoinModels';
export const cutLongLine: TCutLongLine = (line, symbolCount) => {
    let newLine = '';
    for (let index = 0; index < line.length; index++) {
        if (index > symbolCount) return newLine + '...';
        newLine += line[index];
    }
    return newLine;
};