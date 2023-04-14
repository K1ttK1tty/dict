export const setTheme = (pageTheme) => {
    const a = document.documentElement;
    a.setAttribute('data-theme', pageTheme)
}