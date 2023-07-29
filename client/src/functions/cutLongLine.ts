import { TCutLongLine } from './functoinModels';

export const cutLongLine: TCutLongLine = (line, symbolCount) => {
    if (symbolCount <= 0) return '';
    if (line.length === symbolCount) return line;

    let newLine = '';
    for (let index = 0; index < line.length; index++) {
        if (index > symbolCount) return newLine + '...';
        newLine += line[index];
    }
    return newLine;
};
