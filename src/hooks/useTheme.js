export const useTheme = (pageTheme) => {
    const a = document.documentElement;
    // console.log(document.documentElement)
    a.setAttribute('data-theme', pageTheme)

}