export const changeTheme = (elem: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = elem.target as HTMLInputElement;
    if (inputElement.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
};