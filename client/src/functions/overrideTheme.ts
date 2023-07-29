import { TOverrideTheme } from './functoinModels';

export const overrideTheme: TOverrideTheme = (themesArray, oldTheme, newTheme) => {
    const newArray = [...themesArray].map(theme => {
        if (theme === oldTheme) {
            return newTheme;
        }
        return theme;
    });
    return newArray;
};
