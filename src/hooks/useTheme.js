export const useTheme = (pageTheme) => {
    const a = document.documentElement;
    a.setAttribute('data-theme', pageTheme)

}