export const overrideTheme = (themesArray: string[], oldTheme: string, newTheme: string) => {
    const newArray = [...themesArray].map(theme => {
        if (theme === oldTheme) {
            return newTheme;
        }
        return theme;
    });
    return newArray;
};