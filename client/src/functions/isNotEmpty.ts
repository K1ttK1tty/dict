export const isNotEmpty = (variable: string) => {
    const ifNotEmpty = variable.split(' ').join('');
    if (ifNotEmpty) return true;
    else return false;
};
