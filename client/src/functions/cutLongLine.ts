export const cutLongLine = (line: string, symbolCount: number) => {
    let newLine = '';
    for (let index = 0; index < line.length; index++) {
        if (index > symbolCount) return newLine + '...';
        newLine += line[index];
    }
    return newLine;
};