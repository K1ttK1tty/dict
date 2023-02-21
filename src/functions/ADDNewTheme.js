export const ADDNewTheme = (selectOptions,newTheme,setSelectOptions) => {
    let opt = [...selectOptions];
    let a = 0;
    for (let index = 0; index < opt.length; index++) {
        const element = opt[index];
        if (element == newTheme) a = 1;
    }
    if (!a) setSelectOptions([...selectOptions, newTheme]);
}