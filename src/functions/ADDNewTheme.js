export const ADDNewTheme = (selectOptions, newTheme, setSelectOptions, dispatch) => {
    let opt = [...selectOptions];
    let a = 0;
    for (let index = 0; index < opt.length; index++) {
        const element = opt[index];
        if (element == newTheme) a = 1;
    }
    if (!a) dispatch(setSelectOptions([...selectOptions, newTheme]))
}