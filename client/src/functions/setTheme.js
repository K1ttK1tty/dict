export const setTheme = () => {
    const theme = localStorage.getItem('theme')
    const mainElement = document.documentElement;
    if (theme) mainElement.setAttribute('data-theme', theme)
    else mainElement.setAttribute('data-theme', 'ligth')
}